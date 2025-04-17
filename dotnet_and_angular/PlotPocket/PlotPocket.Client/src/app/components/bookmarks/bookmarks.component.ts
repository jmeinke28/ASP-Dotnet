import { Component, OnInit } from '@angular/core';
import { BookmarksService } from '../../services/bookmarks.service';
import { Show } from '../../models/Show';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-bookmarks',
  standalone: true,
  imports: [SearchBarComponent, CommonModule],
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.css'],
})
export class BookmarksComponent implements OnInit {
  bookmarkedShows: Show[] = [];

  constructor(private bookmarksService: BookmarksService) {}

  ngOnInit(): void {
    this.bookmarkedShows = this.bookmarksService.getBookmarks() as Show[];
    console.log(this.bookmarkedShows);  
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
