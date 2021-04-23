import { createContext } from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: Number;
  url: string;
}

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number; //=> index do episodio atual
  isPlaying: boolean;
  play: (episode) => void;
  togglePlay: () => void;
}

export const PlayerContext = createContext({} as PlayerContextData);