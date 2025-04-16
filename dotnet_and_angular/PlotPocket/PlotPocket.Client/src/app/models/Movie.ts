export interface Movie {
    id: number;
    title: string;
    posterPath: string;
    releaseDate: string;
    isBookmarked: boolean;  // For bookmarking functionality
    type: string;  // Type could be 'Movie' or other values based on your use case
  }
  