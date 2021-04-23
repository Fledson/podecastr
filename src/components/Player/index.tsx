import Image from 'next/image';
import { useContext, useEffect, useRef } from 'react';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import { PlayerContext } from '../../contexts/PlayerContexts';

import styles from './styles.module.scss';

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null); //=> referenciando elemento html pelo react e usando a tipagem
  

  const { episodeList, currentEpisodeIndex, isPlaying, togglePlay } = useContext(PlayerContext);

  useEffect(() => {
    // verificando se o elemento audio ref é nulo
    if(!audioRef.current){
      return;
    }

    if(isPlaying){
      audioRef.current.play();
    }else{
      audioRef.current.pause();
    }

  }, [isPlaying]);
  
  const episode = episodeList[currentEpisodeIndex];


  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="/playing.svg" alt="tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      { episode ? (
          
          <div className={styles.currentEpisode}>
            <Image
              width={592}
              height={592}
              src={episode.thumbnail}
              objectFit="cover"
            />
            <strong>{episode.title}</strong>
            <span>{episode.members}</span>
          </div>
        
        ) : (
          <div>
            <strong className={styles.emptyPlayer}>
              Selecione um podcast para ouvir
            </strong>
          </div>
        ) }

      <footer className={!episode ? styles.empty : ""}>

        <div className={styles.progress}>

          <span>00:00</span>
         
          <div className={styles.slider}>
            { episode ? (
              <Slider 
                trackStyle={{ backgroundColor: '#04d361' }} //=> cor do progresso feito
                railStyle={{ backgroundColor: '#9f75ff'}} //=> progresso restante
                handleStyle={{ borderColor: '#04d361', borderWidth: 4}} //=> bolinha
              />
            ) : (
              <div className={styles.emptySlider} />
            ) }
          </div>
          
          <span>00:00</span>

        </div>

        { episode && (
          <audio 
          src={episode.url}
          ref={audioRef}
          autoPlay 
          />
        )}

        <div className={styles.buttons}>
          
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Embaralhar" title="Aleatorio"/>
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-previous.svg" alt="Tocar anterior" title="Tocar anterior"/>
          </button>

          <button 
            type="button" 
            className={styles.playButton} 
            disabled={!episode}
            onClick={togglePlay}>  
            { isPlaying 
              ? <img src="/pause.svg" alt="Pausar" title="Pausar"/>
              : <img src="/play.svg" alt="Tocar" title="Tocar"/>
            }
          </button>

          <button type="button" disabled={!episode}>
            <img src="/play-next.svg" alt="Tocar Proxima" title="Tocar Proxima"/>
          </button>

          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" title="Repetir"/>
          </button>

        </div>

      </footer>

    </div>
  );
}