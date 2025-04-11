import { Component } from '@angular/core';
import { SearchBarComponent } from '../search-bar/search-bar.component';

@Component({
  selector: 'app-tvshows',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './tvshows.component.html',
  styleUrl: './tvshows.component.css',
})
export class TvshowsComponent {}
