import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../../services/trending.service';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [],
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent implements OnInit {
  trendingMovies: any[] = []; // Array to store trending movies
  trendingTVShows: any[] = []; // Array to store trending TV shows
  isLoading: boolean = true; // Flag to show loading spinner or message
  errorMessage: string = ''; // For storing error message if any

  constructor(private trendingService: TrendingService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getTrendingTV();
  }

  // Method to fetch trending movies
  getTrendingMovies() {
    this.trendingService.getTrendingMovies().subscribe(
      (data) => {
        this.trendingMovies = data.results; // Store the movie results in the array
        this.isLoading = false; // Set loading to false when data is received
      },
      (error) => {
        this.isLoading = false; // Stop loading on error
        this.errorMessage = 'Error fetching trending movies'; // Show error message
        console.error('Error fetching movies:', error);
      }
    );
  }

  // Method to fetch trending TV shows
  getTrendingTV() {
    this.trendingService.getTrendingTVShows().subscribe(
      (data) => {
        this.trendingTVShows = data.results; // Store the TV show results in the array
      },
      (error) => {
        this.errorMessage = 'Error fetching trending TV shows'; // Show error message
        console.error('Error fetching TV shows:', error);
      }
    );
  }
}
