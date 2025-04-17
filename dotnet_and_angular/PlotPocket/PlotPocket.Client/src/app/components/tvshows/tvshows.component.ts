import { Component, OnInit } from '@angular/core';
import { TvshowsService } from '../../services/tvshows.service';
import { BookmarksService } from '../../services/bookmarks.service';
import { CommonModule } from '@angular/common';
import { Show } from '../../models/Show';
import { forkJoin } from 'rxjs';
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: 'app-tvshows',
  standalone: true,
  imports: [CommonModule, SearchBarComponent],
  templateUrl: './tvshows.component.html',
  styleUrls: ['./tvshows.component.css'],
})
export class TvshowsComponent implements OnInit {
  airingToday: Show[] = [];
  topRated: Show[] = [];
  popular: Show[] = [];
  allTvShows: Show[] = [];
  filteredTvShows: Show[] = [];
  isLoading = true;
  errorMessage: string | null = null;
  selectedCategory: string = 'all';
  searchQuery: string = '';

  constructor(
    private tvshowsService: TvshowsService,
    private bookmarksService: BookmarksService 
  ) {}

  ngOnInit(): void {
    forkJoin([
      this.tvshowsService.getAiringToday(),
      this.tvshowsService.getTopRated(),
      this.tvshowsService.getPopular(),
    ]).subscribe(
      ([airingToday, topRated, popular]) => {
        this.airingToday = airingToday || [];
        this.topRated = topRated || [];
        this.popular = popular || [];
        this.updateAllTvShows();
        this.applySearchFilter();
        this.isLoading = false;
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
    this.applySearchFilter();
  }

  changeCategory(category: string): void {
    this.selectedCategory = category;
    this.searchQuery = ''; 
    this.updateAllTvShows();
  }

  onSearch(query: string): void {
    this.searchQuery = query.trim().toLowerCase();
    this.applySearchFilter();
  }

  applySearchFilter(): void {
    if (!this.searchQuery) {
      this.filteredTvShows = this.allTvShows;
    } else {
      const allShows = [...this.airingToday, ...this.topRated, ...this.popular];
      this.filteredTvShows = allShows.filter((show) =>
        show.title?.toLowerCase().includes(this.searchQuery)
      );
    }
  }

  toggleBookmark(show: Show): void {
    if (!show) return;

    show.isBookmarked = !show.isBookmarked;

    if (show.isBookmarked) {
      this.bookmarksService.addBookmark(show);
    } else {
      this.bookmarksService.removeBookmark(show);
    }

    console.log('Bookmark status changed for show:', show.title, show.isBookmarked);
  }
}
