import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../../services/trending.service';
<<<<<<< HEAD
import { ShowCardComponent } from '../show-card/show-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
=======
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ShowCardComponent } from '../show-card/show-card.component';
>>>>>>> f6772b669156dbd79d36cc6622c6623a3ca220b6

@Component({
  selector: 'app-trending',
  standalone: true,
<<<<<<< HEAD
  imports: [SearchBarComponent, ShowCardComponent, CommonModule],
=======
  imports: [SearchBarComponent],
>>>>>>> f6772b669156dbd79d36cc6622c6623a3ca220b6
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent implements OnInit {
  trendingMovies: any[] = [];
  trendingTVShows: any[] = [];
<<<<<<< HEAD
  allTrending: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  selectedCategory: string = 'all';
=======
  isLoading: boolean = true;
  errorMessage: string = '';
>>>>>>> f6772b669156dbd79d36cc6622c6623a3ca220b6

  constructor(private trendingService: TrendingService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getTrendingTV();
  }

  getTrendingMovies() {
    this.trendingService.getTrendingMovies().subscribe(
      (data) => {
<<<<<<< HEAD
        // Assuming data is already an array of movies
        this.trendingMovies = data;  // Directly use the data, since it’s already an array
        this.updateAllTrending(); // Combine movies and TV shows
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
=======
        this.trendingMovies = data.results; // Store the movie results in the array
        this.isLoading = false; // Set loading to false when data is received
      },
      (error) => {
        this.isLoading = false; // Stop loading on error
>>>>>>> f6772b669156dbd79d36cc6622c6623a3ca220b6
        this.errorMessage = 'Error fetching trending movies';
        console.error('Error fetching movies:', error);
      }
    );
  }

<<<<<<< HEAD
  getTrendingTV() {
    this.trendingService.getTrendingTVShows().subscribe(
      (data) => {
        console.log('Trending TV Shows data:', data); // Log the response here
        this.trendingTVShows = data; // Store the TV show results in the array
        this.updateAllTrending(); // Combine movies and TV shows
=======
  // Method to fetch trending TV shows
  getTrendingTV() {
    this.trendingService.getTrendingTVShows().subscribe(
      (data) => {
        this.trendingTVShows = data.results; // Store the TV show results in the array
>>>>>>> f6772b669156dbd79d36cc6622c6623a3ca220b6
      },
      (error) => {
        this.errorMessage = 'Error fetching trending TV shows'; // Show error message
        console.error('Error fetching TV shows:', error);
      }
    );
  }
<<<<<<< HEAD
  

  updateAllTrending() {
    this.allTrending = [...this.trendingMovies, ...this.trendingTVShows];
  }

  setSelectedCategory(category: string) {
    this.selectedCategory = category;
  }
=======
>>>>>>> f6772b669156dbd79d36cc6622c6623a3ca220b6
}
