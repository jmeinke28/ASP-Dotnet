import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../../services/trending.service';
import { forkJoin } from 'rxjs';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ShowCardComponent } from '../show-card/show-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending',
  standalone : true,
  imports: [SearchBarComponent, ShowCardComponent, CommonModule],
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  trendingMovies: any[] = [];
  trendingTVShows: any[] = [];
  allTrending: any[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  selectedCategory: string = 'all'; // Default category

  constructor(private trendingService: TrendingService) {}

  ngOnInit(): void {
    console.log('TrendingComponent initialized');
    
    // Use forkJoin to fetch both trending movies and TV shows in parallel
    forkJoin([
      this.trendingService.getTrendingMovies(),
      this.trendingService.getTrendingTVShows()
    ]).subscribe(
      ([movies, tvShows]) => {
        console.log('Trending movies and TV shows fetched');
        this.trendingMovies = movies;
        this.trendingTVShows = tvShows;
        this.updateAllTrending();  // Update the allTrending array with both movies and TV shows
        this.isLoading = false;    // Set loading to false when data is fetched
      },
      (error) => {
        console.error('Error fetching trending data:', error);
        this.isLoading = false;
        this.errorMessage = `Error: ${error.message || 'An error occurred'}`;
      }
    );
  }

  // Update the allTrending array based on the selected category
  updateAllTrending(): void {
    if (this.selectedCategory === 'all') {
      this.allTrending = [...this.trendingMovies, ...this.trendingTVShows];
    } else if (this.selectedCategory === 'movies') {
      this.allTrending = this.trendingMovies;
    } else if (this.selectedCategory === 'tv') {
      this.allTrending = this.trendingTVShows;
    }
  }

  changeCategory(category: string) {
    this.selectedCategory = category;
  }

}
