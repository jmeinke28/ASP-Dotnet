import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { ShowCardComponent } from "../show-card/show-card.component";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [SearchBarComponent, CommonModule, ShowCardComponent],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  isLoading = true;
  errorMessage: string = '';
  selectedCategory: string = 'now_playing'; // Default category

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.getNowPlayingMovies();
  }

  getNowPlayingMovies() {
    this.isLoading = true;
    this.errorMessage = '';

    this.moviesService.getNowPlayingMovies().subscribe(
      (data) => {
        this.movies = data.results.map((movie: any) => ({
          ...movie,
          isBookmarked: false, // Initialize bookmark state
          type: 'Movie' // Type field for consistency
        }));
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
        console.log('Top Rated Response:', data);
        this.movies = data.results.map((movie: any) => ({
          ...movie,
          isBookmarked: false, // Initialize bookmark state
          type: 'Movie' // Type field for consistency
        }));
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
        this.movies = data.results.map((movie: any) => ({
          ...movie,
          isBookmarked: false, // Initialize bookmark state
          type: 'Movie' // Type field for consistency
        }));
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

  toggleBookmark(movie: any): void {
    movie.isBookmarked = !movie.isBookmarked;
    console.log(`${movie.title} bookmark status: ${movie.isBookmarked}`);
  }
}
