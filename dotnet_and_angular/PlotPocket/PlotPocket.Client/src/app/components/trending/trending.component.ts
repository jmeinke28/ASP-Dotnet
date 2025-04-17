import { Component, OnInit } from '@angular/core';
import { TrendingService } from '../../services/trending.service';
import { forkJoin } from 'rxjs';
import { BookmarksService } from '../../services/bookmarks.service';
import { Show } from '../../models/Show';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trending',
  standalone: true,
  imports: [SearchBarComponent, CommonModule],
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {
  trendingMovies: any[] = [];
  trendingTVShows: any[] = [];
  allTrending: any[] = [];
  filteredTrending: any[] = [];  // Store the filtered list
  isLoading = true;
  errorMessage: string | null = null;
  selectedCategory: string = 'all'; // Default category
  searchQuery: string = ''; // Store the search query

  constructor(private trendingService: TrendingService,  private bookmarksService: BookmarksService) {}

  ngOnInit(): void {
    forkJoin([
      this.trendingService.getTrendingMovies(),
      this.trendingService.getTrendingTVShows()
    ]).subscribe(
      ([movies, tvShows]) => {
        console.log('Trending movies and TV shows fetched');
        this.trendingMovies = movies;
        this.trendingTVShows = tvShows;
        this.updateAllTrending();  // Update the allTrending array
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching trending data:', error);
        this.isLoading = false;
        this.errorMessage = `Error: ${error.message || 'An error occurred'}`;
      }
    );
  }

  // Update the allTrending array based on selected category and search query
  updateAllTrending(): void {
    let combined = [];
    if (this.selectedCategory === 'all') {
      combined = [...this.trendingMovies, ...this.trendingTVShows];
    } else if (this.selectedCategory === 'movies') {
      combined = this.trendingMovies;
    } else if (this.selectedCategory === 'tv') {
      combined = this.trendingTVShows;
    }
  
    // Sync bookmark status
    combined.forEach(show => {
      show.isBookmarked = this.bookmarksService.isBookmarked(show);
    });
  
    // Filter based on the search query
    if (this.searchQuery) {
      this.filteredTrending = combined.filter(show =>
        show.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      // Reset filteredTrending to the full list when the search query is empty
      this.filteredTrending = combined;
    }
  }
  

  changeCategory(category: string): void {
    this.selectedCategory = category;
    this.searchQuery = ''; // Reset search query when category changes
    this.updateAllTrending();  // Update the allTrending array based on the selected category
  }

  toggleBookmark(show: Show): void {
    if (!show) return;
  
    // Toggle bookmark status
    show.isBookmarked = !show.isBookmarked;
  
    // Add or remove bookmark from service
    if (show.isBookmarked) {
      this.bookmarksService.addBookmark(show);
    } else {
      this.bookmarksService.removeBookmark(show);
    }
  
    console.log('Bookmark status changed for show:', show.title, show.isBookmarked);
  }
  

  onSearch(query: string): void {
    this.searchQuery = query;  // Set the search query
    this.updateAllTrending();  // Re-run the update method to filter based on the search
  }
}
