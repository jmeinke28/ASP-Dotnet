import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { ShowCardComponent } from "../show-card/show-card.component";

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [SearchBarComponent, CommonModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: any[] = [];
  isLoading = true;
  errorMessage: string = '';

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    this.getNowPlayingMovies();
  }

  getNowPlayingMovies() {
    this.isLoading = true;
    this.errorMessage = '';

    this.moviesService.getNowPlayingMovies().subscribe(
      (data) => {
        console.log('Now Playing Response:', data);
        this.movies = data.results.map((movie: any) => ({
          ...movie,
          isBookmarked: false // Add isBookmarked field to each movie
        })); // Add isBookmarked to each movie object
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
          isBookmarked: false // Add isBookmarked field to each movie
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
        console.log('Popular Response:', data);
        this.movies = data.results.map((movie: any) => ({
          ...movie,
          isBookmarked: false // Add isBookmarked field to each movie
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
    this.isLoading = true;
    this.errorMessage = ''; // Reset error message

    // Make sure the category values ('now_playing', 'top_rated', 'popular') are properly handled
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
