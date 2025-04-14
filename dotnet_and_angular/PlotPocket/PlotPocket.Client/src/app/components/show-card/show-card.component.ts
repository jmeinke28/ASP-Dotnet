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
  posterURL: string = '';

  private router = inject(Router);

  // Lifecycle hook to update the posterURL when the show changes
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show'] && this.show) {
      this.posterURL = `https://image.tmdb.org/t/p/w500${this.show.posterPath}`;
    }
  }

  toggleBookmark() {
    if (!this.show) return;
    this.show.isBookmarked = !this.show.isBookmarked;
  }
}
