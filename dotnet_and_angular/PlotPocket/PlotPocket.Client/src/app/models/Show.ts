export interface Show {
  id: number;
  title: string;
  posterPath: string;
  date: string;
  type: string; 
  isBookmarked: boolean;
  mediaType?: 'movie' | 'tv';
}
