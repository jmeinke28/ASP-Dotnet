import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../../services/trending.service';
import { ShowCardComponent } from '../show-card/show-card.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [SearchBarComponent, ShowCardComponent, CommonModule],
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css'],
})
export class TrendingComponent implements OnInit {
  trendingMovies: any[] = [];
  trendingTVShows: any[] = [];
  allTrending: any[] = [];
  isLoading: boolean = true;
  errorMessage: string = '';
  selectedCategory: string = 'all';

  constructor(private trendingService: TrendingService) {}

  ngOnInit(): void {
    this.getTrendingMovies();
    this.getTrendingTV();
  }

  getTrendingMovies() {
    this.trendingService.getTrendingMovies().subscribe(
      (data) => {
        // Assuming data is already an array of movies
        this.trendingMovies = data;  // Directly use the data, since it’s already an array
        this.updateAllTrending(); // Combine movies and TV shows
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'Error fetching trending movies';
        console.error('Error fetching movies:', error);
      }
    );
  }

  getTrendingTV() {
    this.trendingService.getTrendingTVShows().subscribe(
      (data) => {
        console.log('Trending TV Shows data:', data); // Log the response here
        this.trendingTVShows = data; // Store the TV show results in the array
        this.updateAllTrending(); // Combine movies and TV shows
      },
      (error) => {
        this.errorMessage = 'Error fetching trending TV shows'; // Show error message
        console.error('Error fetching TV shows:', error);
      }
    );
  }
  

  updateAllTrending() {
    this.allTrending = [...this.trendingMovies, ...this.trendingTVShows];
  }

  setSelectedCategory(category: string) {
    this.selectedCategory = category;
  }
}
