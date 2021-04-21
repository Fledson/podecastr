import styles from './styles.module.scss';

export function Player() {

  return (
    <div className={styles.playerContainer}>
      <header>
        <img src="playing.svg" alt="tocando agora"/>
        <strong>Tocando agora</strong>
      </header>

      <div>
        <strong className={styles.emptyPlayer}>
          Selecione um podcast para ouvir
        </strong>
      </div>

      <footer className={styles.empty}>

        <div className={styles.progress}>

          <span>00:00</span>
         
          <div className={styles.slider}>
            <div className={styles.emptySlider} />
          </div>
          
          <span>00:00</span>

        </div>

        <div className={styles.buttons}>
          
          <button type="button">
            <img src="/shuffle.svg" alt="Embaralhar" title="Aleatorio"/>
          </button>

          <button type="button">
            <img src="/play-previous.svg" alt="Tocar anterior" title="Tocar anterior"/>
          </button>

          <button type="button" className={styles.playButton}>
            <img src="/play.svg" alt="Tocar" title="Tocar"/>
          </button>

          <button type="button">
            <img src="/play-next.svg" alt="Tocar Proxima" title="Tocar Proxima"/>
          </button>

          <button type="button">
            <img src="/repeat.svg" alt="Repetir" title="Repetir"/>
          </button>

        </div>

      </footer>

    </div>
  );
}