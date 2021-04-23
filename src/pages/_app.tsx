import "../styles/global.scss";

import {Header} from '../components/Header';
import {Player} from '../components/Player';
import { PlayerContext } from "../contexts/PlayerContexts";


import styles from "../styles/app.module.scss";
import { useState } from "react";

function MyApp({ Component, pageProps }) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false)
;
  function play(episode) {
    setEpisodeList([episode]);
    setEpisodeIndex(0);
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  return (

    <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePlay }}>
    <div className={styles.wrapper}>

      <main>
        <Header />
        <Component {...pageProps} />
      </main>
      
      <Player />
    </div>
    </PlayerContext.Provider>
  )
}

export default MyApp