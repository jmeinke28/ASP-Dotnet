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
  filteredTrending: any[] = [];  
  isLoading = true;
  errorMessage: string | null = null;
  selectedCategory: string = 'all';
  searchQuery: string = ''; 

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
        this.updateAllTrending(); 
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching trending data:', error);
        this.isLoading = false;
        this.errorMessage = `Error: ${error.message || 'An error occurred'}`;
      }
    );
  }

  updateAllTrending(): void {
    let combined = [];
    if (this.selectedCategory === 'all') {
      combined = [...this.trendingMovies, ...this.trendingTVShows];
    } else if (this.selectedCategory === 'movies') {
      combined = this.trendingMovies;
    } else if (this.selectedCategory === 'tv') {
      combined = this.trendingTVShows;
    }
  
    combined.forEach(show => {
      show.isBookmarked = this.bookmarksService.isBookmarked(show);
    });
  
    if (this.searchQuery) {
      this.filteredTrending = combined.filter(show =>
        show.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredTrending = combined;
    }
  }
  

  changeCategory(category: string): void {
    this.selectedCategory = category;
    this.searchQuery = ''; 
    this.updateAllTrending();  
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
  

  onSearch(query: string): void {
    this.searchQuery = query; 
    this.updateAllTrending(); 
  }
}
