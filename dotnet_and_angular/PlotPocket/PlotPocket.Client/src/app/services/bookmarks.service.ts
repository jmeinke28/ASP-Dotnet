import { Injectable } from '@angular/core';
import { Show } from '../models/Show';  // Assuming Show is for TV shows
import { Movie } from '../models/Movie'; // Add Movie model for movies

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  private bookmarks: (Show | Movie)[] = []; // Store both Shows and Movies in the same array

  // Get all bookmarks (Movies + Shows)
  getBookmarks(): (Show | Movie)[] {
    return this.bookmarks;
  }

  // Add Bookmark for both Show or Movie
  addBookmark(item: Show | Movie): void {
    if (!this.bookmarks.some(s => s.title === item.title)) {
      this.bookmarks.push({ ...item, isBookmarked: true });
    }
  }

  // Remove Bookmark for both Show or Movie
  removeBookmark(item: Show | Movie): void {
    this.bookmarks = this.bookmarks.filter(s => s.title !== item.title);
  }

  // Check if Show or Movie is bookmarked
  isBookmarked(item: Show | Movie): boolean {
    return this.bookmarks.some(s => s.title === item.title);
  }
}
