import { createContext, useState, ReactNode, useContext } from 'react';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  members: string;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number; //=> index do episodio atual
  isPlaying: boolean; //=> ve se tem apos
  isLooping: boolean; 
  isShuffling: boolean;
  hasPrevious: boolean; //=> ve se tem podcast antes
  hasNext: boolean;
  play: (episode) => void;
  playList: (list: Episode[], index) => void;
  playNext: () => void;
  playPrevious: () => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  clearPlayerState: () => void;
  setPlayerState: (state:boolean) => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

type playerContextProviderProps = {
  children: ReactNode;
}

export function PlayerContextProvider({children}: playerContextProviderProps) {

  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setEpisodeIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);

  function play(episode:Episode) {
    setEpisodeList([episode]);
    setEpisodeIndex(0);
    setIsPlaying(true);
  }

  function playList(list:Episode[], index:number) {
    setIsPlaying(true);
    setEpisodeList(list);
    setEpisodeIndex(index);
  }

  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }

  function setPlayerState (state: boolean){
    setIsPlaying(state);
  }

  function clearPlayerState() {
    setEpisodeList[0];
    setEpisodeIndex[0]
  }

  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling ||(currentEpisodeIndex + 1) < episodeList.length;

  function playNext() {

    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
    
      setEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setEpisodeIndex(currentEpisodeIndex + 1);
    }
  }

  function playPrevious() {
    if (hasPrevious) {
      setEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  return (
    <PlayerContext.Provider 
      value={{ 
          episodeList, 
          currentEpisodeIndex, 
          play,
          playList,
          playNext,
          playPrevious, 
          isPlaying, 
          isLooping, 
          isShuffling, 
          togglePlay,
          toggleLoop,
          toggleShuffle,
          setPlayerState,
          hasNext,
          hasPrevious,
          clearPlayerState 
      }}>

        {children}

    </ PlayerContext.Provider>
  )

}

// exportando as exportações para dentro da variavel
export const usePlayer = () => {
 return useContext(PlayerContext);
}