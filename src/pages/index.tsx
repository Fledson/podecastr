import { GetStaticProps } from 'next'; //tipagem da função
import { api } from '../services/api';

import {format, parseISO} from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR';
import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';



/** ====================== TIPAGENS ===================== */
type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  description: string;
  members: string;
  duration: number;
  durationAsString: string;
  url: string;
  publishedAt: string;
}

type HomeProps = {
  episodes: Episode[];
}

/** ====================== RENDERIZANDO A TELA ===================== */
export default function Home(props:HomeProps) {
   
  
  return (
    <div>
      <h1>INDEX</h1>
      <p>{JSON.stringify(props.episodes)}</p>
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
      durationAs: convertDurationToTimeString(Number(episode.file.duration)),
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