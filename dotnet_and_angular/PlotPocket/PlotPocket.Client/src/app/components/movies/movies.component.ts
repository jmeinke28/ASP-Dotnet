import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { BookmarksService } from '../../services/bookmarks.service';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [SearchBarComponent, CommonModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  allMovies: any[] = [];
  isLoading = true;
  errorMessage: string = '';
  selectedCategory: string = 'now_playing';

  constructor(private moviesService: MoviesService, private bookmarksService: BookmarksService) {}

  ngOnInit() {
    this.getNowPlayingMovies();
  }

  getNowPlayingMovies() {
    this.isLoading = true;
    this.errorMessage = '';

    this.moviesService.getNowPlayingMovies().subscribe(
      (data) => {
        const processedMovies = data.results.map((movie: any) => ({
          ...movie,
          isBookmarked: this.bookmarksService.isBookmarked(movie),
          type: 'Movie',
          release_date: movie.release_date,
        }));
        this.movies = processedMovies;
        this.allMovies = processedMovies;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching Now Playing movies. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  getTopRatedMovies() {
    this.isLoading = true;
    this.errorMessage = '';

    this.moviesService.getTopRatedMovies().subscribe(
      (data) => {
        const processedMovies = data.results.map((movie: any) => ({
          ...movie,
          isBookmarked: this.bookmarksService.isBookmarked(movie),
          type: 'Movie',
          release_date: movie.release_date,
        }));
        this.movies = processedMovies;
        this.allMovies = processedMovies;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching Top Rated movies. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  getPopularMovies() {
    this.isLoading = true;
    this.errorMessage = '';

    this.moviesService.getPopularMovies().subscribe(
      (data) => {
        const processedMovies = data.results.map((movie: any) => ({
          ...movie,
          isBookmarked: this.bookmarksService.isBookmarked(movie),
          type: 'Movie',
          release_date: movie.release_date,
        }));
        this.movies = processedMovies;
        this.allMovies = processedMovies;
        this.isLoading = false;
      },
      (error) => {
        this.errorMessage = 'Error fetching Popular movies. Please try again later.';
        this.isLoading = false;
      }
    );
  }

  changeCategory(category: string): void {
    this.selectedCategory = category;
    if (category === 'now_playing') {
      this.getNowPlayingMovies();
    } else if (category === 'top_rated') {
      this.getTopRatedMovies();
    } else if (category === 'popular') {
      this.getPopularMovies();
    }
  }

  onSearch(query: string): void {
    const lowerQuery = query.toLowerCase();
    this.movies = this.allMovies.filter(movie =>
      movie.title?.toLowerCase().includes(lowerQuery)
    );
  }

  toggleBookmark(movie: any): void {
    if (movie.isBookmarked) {
      this.bookmarksService.removeBookmark(movie);
    } else {
      this.bookmarksService.addBookmark(movie);
    }
    movie.isBookmarked = !movie.isBookmarked;
  }
}
