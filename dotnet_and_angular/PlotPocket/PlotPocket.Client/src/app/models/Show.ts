export interface Show {
  id: number;
  showApiId: number;
  title: string;
  posterPath: string;
  date: string;
  type: string; 
  isBookmarked: boolean;
  mediaType?: 'movie' | 'tvshow';
}
