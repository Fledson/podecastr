import { GetStaticProps } from 'next'; //tipagem da função
import Image from 'next/image';
import Link from 'next/link';
import {format, parseISO} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';

import { api } from '../services/api';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';


import styles from './home.module.scss';
import { useContext } from 'react';
import { PlayerContext } from '../contexts/PlayerContexts';

/** ====================== TIPAGENS ===================== */
type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type HomeProps = {
  latestEpisodes: Episode[],
  allEpisodes: Episode[]
}

/** ====================== RENDERIZANDO A TELA ===================== */
export default function Home({latestEpisodes, allEpisodes}:HomeProps) {
   
  const { play } = useContext(PlayerContext);
  
  return (
    <div className={styles.homepage}>

      <section className={styles.latestEpisodes}>
        <h2>Ultimos Lançamentos</h2>
       
        <ul>
          {latestEpisodes.map(episode => {
              return (
                <li key={episode.id}>
                    
                    <Image
                    
                      width={192}
                      height={192} 
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    
                    />

                    <div className={styles.episodeDetails}>
                      <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                      </Link>
                      <p>{episode.members}</p>
                      <span>{episode.publishedAt}</span>
                      <span>{episode.durationAsString}</span>

                    </div>

                    <button type="button" onClick={() => play(episode)}>
                      <img src="/play-green.svg" alt="Tocar Episodio" title="Tocar Episodio"/>
                    </button>

                </li> 
              )
            })}
        </ul>
      </section>

      <section className={styles.allEpisodes}>
            <h2>Todos episódios</h2>

            <table cellSpacing={0}>
             
              <thead>
                <tr>
                  <th></th>
                  <th>Podcast</th>
                  <th>Integrantes</th>
                  <th>Data</th>
                  <th>Duração</th>
                  <th></th>
                </tr>
              </thead>

              <tbody>
                {allEpisodes.map(episode => {
                  
                  return (
                    <tr key={episode.id}>
                      <td style={{width: 100}}>
                          <Image
                            width={120}
                            height={120}
                            src={episode.thumbnail}
                            alt={episode.title}
                            objectFit="cover"
                          />
                      </td>

                      <td>
                        <Link href={`/episodes/${episode.id}`}>
                         <a>{episode.title}</a>
                        </Link>
                      </td>
                      <td>{episode.members}</td>
                      <td style={{width:100}}>{episode.publishedAt}</td>
                      <td>{episode.durationAsString}</td>
                      <td>
                        <button type="button" onClick={() => play(episode)}>
                          <img src="/play-green.svg" alt="Tocar episódio" title="Tocar Episodio"/>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>

            </table>
      </section>

    </div>
  )
}

/** ====================== CONSUMINDO API ===================== */

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('episodes', {
    params: {
      _limit: 12,
      _sort:"published_at",
      _order: "desc"
    }
  })

  /**> ====================== TRATANDO AS INFORMAÇÕES ===================== */
  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {locale: ptBR}),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      description: episode.description,
      url: episode.file.url,
    }
  })

  /** ====================== TRANTANDO DADOS -> OBTENDO LISTA DE EPISODIOS ===================== */
  /** Separando os dados e strings diferentes */

  const latestEpisodes = episodes.slice(0, 2); //-> pegando os 2 primeiros da consulta
  const allEpisodes = episodes.slice(2, episodes.length) //-> pegando o resto dos episodes

  /** ====================== RETORNO A HOME ===================== */
  return {
    props: { 
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}