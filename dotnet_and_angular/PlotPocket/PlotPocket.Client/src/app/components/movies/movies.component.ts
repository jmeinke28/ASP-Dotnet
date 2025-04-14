import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../services/movies.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [SearchBarComponent, CommonModule],
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  movies: any[] = []; // Array to hold the movie data
  isLoading = true; // State for loading
  errorMessage: string = ''; // To display error messages if needed

  constructor(private moviesService: MoviesService) {}

  ngOnInit() {
    // Fetch movies by default when the component is initialized
    this.getNowPlayingMovies();
  }

  // Function to fetch Now Playing movies
  getNowPlayingMovies() {
    this.isLoading = true; // Set loading state to true
    this.errorMessage = ''; // Reset error message before making the request

    this.moviesService.getNowPlayingMovies().subscribe(
      (data) => {
        this.movies = data; // Store the movie data
        this.isLoading = false; // Stop the loading spinner
      },
      (error) => {
        this.errorMessage = 'Error fetching Now Playing movies. Please try again later.'; // Set error message
        this.isLoading = false; // Stop the loading spinner
      }
    );
  }

  // Function to fetch Top Rated movies
  getTopRatedMovies() {
    this.isLoading = true; // Set loading state to true
    this.errorMessage = ''; // Reset error message before making the request

    this.moviesService.getTopRatedMovies().subscribe(
      (data) => {
        this.movies = data; // Store the movie data
        this.isLoading = false; // Stop the loading spinner
      },
      (error) => {
        this.errorMessage = 'Error fetching Top Rated movies. Please try again later.'; // Set error message
        this.isLoading = false; // Stop the loading spinner
      }
    );
  }

  // Function to fetch Popular movies
  getPopularMovies() {
    this.isLoading = true; // Set loading state to true
    this.errorMessage = ''; // Reset error message before making the request

    this.moviesService.getPopularMovies().subscribe(
      (data) => {
        this.movies = data; // Store the movie data
        this.isLoading = false; // Stop the loading spinner
      },
      (error) => {
        this.errorMessage = 'Error fetching Popular movies. Please try again later.'; // Set error message
        this.isLoading = false; // Stop the loading spinner
      }
    );
  }

  // Function to handle category selection (Now Playing, Top Rated, Popular)
  changeCategory(category: string) {
    this.isLoading = true; // Set loading state to true
    this.errorMessage = ''; // Reset error message before making the request

    if (category === 'now_playing') {
      this.getNowPlayingMovies();
    } else if (category === 'top_rated') {
      this.getTopRatedMovies();
    } else if (category === 'popular') {
      this.getPopularMovies();
    }
  }
}
