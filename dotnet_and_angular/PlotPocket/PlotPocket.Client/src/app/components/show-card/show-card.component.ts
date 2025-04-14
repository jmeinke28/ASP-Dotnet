import { Component, inject, Input } from '@angular/core';
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
export class ShowCardComponent {
  @Input() show: Show | null = null;

  private router = inject(Router);
  posterURL = this.show
    ? `https://image.tmdb.org/t/p/w500${this.show.posterPath}`
    : '';

  toggleBookmark() {
    if (!this.show) return;
    this.show.isBookmarked = !this.show?.isBookmarked;
  }
}
