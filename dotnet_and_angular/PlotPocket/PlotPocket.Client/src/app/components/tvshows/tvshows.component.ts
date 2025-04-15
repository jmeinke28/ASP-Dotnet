import { Component, OnInit } from '@angular/core';
import { TvshowsService } from '../../services/tvshows.service';
import { Show } from '../../models/Show';
import { forkJoin } from 'rxjs';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { ShowCardComponent } from '../show-card/show-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tvshows',
  standalone: true,
  imports: [SearchBarComponent, ShowCardComponent, CommonModule],
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css'],
})
export class TvshowsComponent implements OnInit {
  airingToday: Show[] = [];
  topRated: Show[] = [];
  popular: Show[] = [];
  allTvShows: Show[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  selectedCategory: string = 'all'; // Default category

  constructor(private tvshowsService: TvshowsService) {}

  ngOnInit(): void {
    // Fetch airing today, top rated, and popular TV shows in parallel
    forkJoin([
      this.tvshowsService.getAiringToday(),
      this.tvshowsService.getTopRated(),
      this.tvshowsService.getPopular(),
    ]).subscribe(
      ([airingToday, topRated, popular]) => {
        console.log('TV shows fetched');
        this.airingToday = airingToday.results;
        this.topRated = topRated.results;
        this.popular = popular.results;
        this.updateAllTvShows(); // Update the allTvShows array with selected category data
        this.isLoading = false;  // Set loading to false when data is fetched
      },
      (error) => {
        console.error('Error fetching TV shows data:', error);
        this.isLoading = false;
        this.errorMessage = `Error: ${error.message || 'An error occurred'}`;
      }
    );
  }

  // Update the allTvShows array based on the selected category
  updateAllTvShows(): void {
    if (this.selectedCategory === 'all') {
      this.allTvShows = [
        ...this.airingToday,
        ...this.topRated,
        ...this.popular,
      ];
    } else if (this.selectedCategory === 'airing') {
      this.allTvShows = this.airingToday;
    } else if (this.selectedCategory === 'top-rated') {
      this.allTvShows = this.topRated;
    } else if (this.selectedCategory === 'popular') {
      this.allTvShows = this.popular;
    }
  }

  // Change category to filter TV shows
  changeCategory(category: string): void {
    this.selectedCategory = category;
    this.updateAllTvShows();
  }
}
