export interface Show {
  id: number;
  title: string;
  posterPath: string;
  date: string; // release_date or first_air_date
  type: string; // genre or label like 'Movie' or 'TV Show'
  isBookmarked: boolean;
  mediaType?: 'movie' | 'tv'; // optional but helpful
}
