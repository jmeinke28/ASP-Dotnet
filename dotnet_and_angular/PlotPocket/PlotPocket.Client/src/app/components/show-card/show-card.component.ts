import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-card',
  standalone: true,
  imports: [],
  templateUrl: './show-card.component.html',
  styleUrl: './show-card.component.css',
})
export class ShowCardComponent {
  private router = inject(Router);
}
