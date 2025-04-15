import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Show } from '../../models/Show';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-card.component.html',
  styleUrls: ['./show-card.component.css'],
})
export class ShowCardComponent implements OnChanges {
  @Input() show: Show | null = null;

  private router = inject(Router);
  posterURL: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    // Check if show or show.posterPath has changed
    if (changes['show']) {
      this.updatePosterURL();
    }
  }

  private updatePosterURL(): void {
    if (this.show && this.show.posterPath) {
      this.posterURL = `https://image.tmdb.org/t/p/w500${this.show.posterPath}`;
      console.log('Updated Poster URL:', this.posterURL);
    } else {
      this.posterURL = '';
      console.log('No poster path available, no image URL set.');
    }
  }

  toggleBookmark(): void {
    if (!this.show) return;
    this.show.isBookmarked = !this.show?.isBookmarked;
    console.log('Bookmark status changed:', this.show.isBookmarked);
  }
}
