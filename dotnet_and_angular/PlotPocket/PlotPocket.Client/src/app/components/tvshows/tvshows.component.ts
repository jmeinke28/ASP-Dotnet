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
    forkJoin([
      this.tvshowsService.getAiringToday(),
      this.tvshowsService.getTopRated(),
      this.tvshowsService.getPopular(),
    ]).subscribe(
      ([airingToday, topRated, popular]) => {
        
        // Directly assigning the fetched arrays
        this.airingToday = airingToday || [];
        this.topRated = topRated || [];
        this.popular = popular || [];

        this.updateAllTvShows(); // Update the allTvShows array based on the selected category
        this.isLoading = false; // Set loading to false when data is fetched
        console.log('Loading finished');
      },
      (error) => {
        console.error('Error fetching TV shows data:', error);
        this.isLoading = false;
        this.errorMessage = `Error: ${error.message || 'An error occurred'}`;
      }
    );
  }

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
    console.log('Category changed to:', 
      category === 'airing' ? 'Airing Today' : 
      category === 'top-rated' ? 'Top Rated' : 
      category === 'popular' ? 'Popular' : category);

    this.updateAllTvShows(); // Update TV shows when category changes
  }

  toggleBookmark(show: Show): void {
    if (!show) return;
    show.isBookmarked = !show.isBookmarked;
    console.log('Bookmark status changed for show:', show.title, show.isBookmarked);
  }
}
