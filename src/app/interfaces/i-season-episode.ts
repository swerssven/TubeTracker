export interface ISeasonsEpisodesListDto{
  totalNumEpisodes: number,
  totalNumSeasons: number,
  seasonsList: ISeasonsDto[]
}

interface ISeasonsDto{
  numSeason: number;
  episodesList: IEpisode[];
}

export interface IEpisode {
  seasonsEpisodesId: number,
  serieApiId: number,
  numSeason: number,
  numEpisode: number,
  episodeDuration: number,
  titleEpisodeEn: string,
  titleEpisodeEs: string,
  premiereDate: Date,
  watched: boolean
}
