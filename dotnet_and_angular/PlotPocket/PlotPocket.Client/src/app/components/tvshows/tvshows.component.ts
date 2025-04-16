import { Component, OnInit } from '@angular/core';
import { TvshowsService } from '../../services/tvshows.service';
import { forkJoin } from 'rxjs';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';
import { Show } from '../../models/Show';

@Component({
  selector: 'app-tvshows',
  standalone: true,
  imports: [SearchBarComponent, CommonModule],
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
    // Use forkJoin to fetch all the TV show categories in parallel
    forkJoin([
      this.tvshowsService.getAiringToday(),
      this.tvshowsService.getTopRated(),
      this.tvshowsService.getPopular(),
    ]).subscribe(
      ([airingToday, topRated, popular]) => {
        // Log the raw API responses
        console.log('Airing Today Raw Response:', airingToday);
        console.log('Top Rated Raw Response:', topRated);
        console.log('Popular Raw Response:', popular);
  
        // Now, proceed with checking and updating each category
        this.airingToday = airingToday?.results || airingToday?.data?.results || [];
        this.topRated = topRated?.results || topRated?.data?.results || [];
        this.popular = popular?.results || popular?.data?.results || [];
  
        // Log the updated categories after assigning them
        console.log('Updated Airing Today:', this.airingToday);
        console.log('Updated Top Rated:', this.topRated);
        console.log('Updated Popular:', this.popular);
  
        this.updateAllTvShows(); // Update the allTvShows array based on the selected category
        this.isLoading = false; // Set loading to false when data is fetched
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
      this.allTvShows = [...this.airingToday, ...this.topRated, ...this.popular];
    } else if (this.selectedCategory === 'airing') {
      this.allTvShows = this.airingToday;
    } else if (this.selectedCategory === 'top-rated') {
      this.allTvShows = this.topRated;
    } else if (this.selectedCategory === 'popular') {
      this.allTvShows = this.popular;
    }
  }

  changeCategory(category: string): void {
    this.selectedCategory = category;
    this.updateAllTvShows(); // Update the allTvShows array based on the selected category
  }

  toggleBookmark(show: Show): void {
    if (!show) return;
    show.isBookmarked = !show.isBookmarked;
    console.log('Bookmark status changed for show:', show.title, show.isBookmarked);
  }
}
