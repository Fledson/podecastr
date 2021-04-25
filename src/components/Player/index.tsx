import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css';

import { usePlayer } from '../../contexts/PlayerContexts';

import styles from './styles.module.scss';
import { convertDurationToTimeString } from '../../utils/convertDurationToTimeString';

export function Player() {
  const audioRef = useRef<HTMLAudioElement>(null); //=> referenciando elemento html pelo react e usando a tipagem
  const [progress, setProgress] = useState(0); 

  // contextos do player
  const { episodeList,
          currentEpisodeIndex, 
          isPlaying, 
          isLooping,
          isShuffling, 
          togglePlay, 
          toggleLoop, 
          toggleShuffle, 
          setPlayerState, 
          playNext, 
          playPrevious, 
          hasNext, 
          hasPrevious,
          clearPlayerState
  } = usePlayer();

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

  // função para verificar o tempo do audio, toda vez que ele atualiza ele atualiza o tempo na pagina  
  function setupProgressListener() {
    audioRef.current.currentTime = 0;

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime));
    });
  }

  // função que joga o tempo selecionado na barra de audio para ser reproduzido
  function handleSeek(amount:number){
    audioRef.current.currentTime = amount;
    setProgress(amount)
  }

  //Função para a opção embaralhar
  function handleEpisodeEnded() {
    if(hasNext) {
      playNext()
    }else{
      clearPlayerState()
    }
  }
  

  const episode = episodeList[currentEpisodeIndex]; // episode recebe o index do episodio que sera tocado

  return (
    <div className={styles.playerContainer}>

      <header>
        <img src="/playing.svg" alt="tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      {/* se tiver episodio selecionado ele mostra as informações no player */}
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

      {/* verificação do footer, se o episode estiver vazio aplica-se a classe empty, estilizando os botões  */}
      <footer className={!episode ? styles.empty : ""}>

        <div className={styles.progress}>

          <span>{convertDurationToTimeString(progress)}</span> {/* tempo de inicio e atual */}

            {/* barra de progresso */}
            <div className={styles.slider}>
              { episode ? (
                <Slider 
                  max={episode.duration} //=> tempo maximo de duração
                  value={progress} //=> progresso do audio
                  onChange={handleSeek} //=> ao alterar o tempo na barra de progresso
                  trackStyle={{ backgroundColor: '#04d361' }} //=> cor do progresso feito
                  railStyle={{ backgroundColor: '#9f75ff'}} //=> progresso restante
                  handleStyle={{ borderColor: '#04d361', borderWidth: 4}} //=> bolinha
                />
              ) : (
                <div className={styles.emptySlider} /> //=> se não estiver episodio selecionado ele mostra vazio
              ) }
            </div>
            
            {/* tempo final */}
          <span>{convertDurationToTimeString(episode?.duration ?? 0)}</span> 

        </div>

        {/* =================================== TAG AUDIO ===================================== */}
        
        { episode && (
          <audio 
          src={episode.url}
          ref={audioRef}
          autoPlay
          loop={isLooping}
          onEnded={handleEpisodeEnded}
          onPlay={() => setPlayerState(true)} 
          onPause={() => setPlayerState(false)}
          onLoadedMetadata={setupProgressListener}
          />
        )}

        <div className={styles.buttons}>
          
          <button 
            type="button" 
            disabled={!episode || episodeList.length === 1}
            onClick={toggleShuffle}
            className={isShuffling ? styles.isActive : ''}
          >
            <img src="/shuffle.svg" alt="Embaralhar" title="Aleatorio"/>
          </button>

          <button type="button" onClick={playPrevious}  disabled={!hasPrevious||!episode}>
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

          <button type="button" onClick={playNext} disabled={!episode||!hasNext} >
            <img src="/play-next.svg" alt="Tocar Proxima" title="Tocar Proxima"/>
          </button>

          <button 
            type="button" 
            disabled={!episode}
            onClick={toggleLoop}
            className={isLooping ? styles.isActive : ''}
          >
            <img src="/repeat.svg" alt="Repetir" title="Repetir"/>
          </button>

        </div>

      </footer>

    </div>
  );
}