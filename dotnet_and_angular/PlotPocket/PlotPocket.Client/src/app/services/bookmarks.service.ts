import { Injectable } from '@angular/core';
import { Show } from '../models/Show';  
import { Movie } from '../models/Movie'; 

@Injectable({
  providedIn: 'root',
})
export class BookmarksService {
  private bookmarks: (Show | Movie)[] = []; 

  getBookmarks(): (Show | Movie)[] {
    return this.bookmarks;
  }

  addBookmark(item: Show | Movie): void {
    if (!this.bookmarks.some(s => s.title === item.title)) {
      this.bookmarks.push({ ...item, isBookmarked: true });
    }
  }

  removeBookmark(item: Show | Movie): void {
    this.bookmarks = this.bookmarks.filter(s => s.title !== item.title);
  }

  isBookmarked(item: Show | Movie): boolean {
    return this.bookmarks.some(s => s.title === item.title);
  }
}
