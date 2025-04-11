import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../../services/trending.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ShowCardComponent } from '../show-card/show-card.component';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [SearchBarComponent, ShowCardComponent],
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent implements OnInit {
  trendingMovies: any[] = [];
  trendingTVShows: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';

  constructor(private trendingService: TrendingService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getTrendingTV();
  }

  getTrendingMovies() {
    this.trendingService.getTrendingMovies().subscribe(
      (data) => {
        this.trendingMovies = data.results; // Store the movie results in the array
        this.isLoading = false; // Set loading to false when data is received
      },
      (error) => {
        this.isLoading = false; // Stop loading on error
        this.errorMessage = 'Error fetching trending movies';
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
