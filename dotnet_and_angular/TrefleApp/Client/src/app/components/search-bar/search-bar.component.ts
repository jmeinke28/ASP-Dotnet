import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlantFilterService } from '../../services/plant-filter.service';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  private _plantFilterService = inject(PlantFilterService);

  public searchQuery: string = '';
  @Input() placeHolder: string = '';

  public search(): void {
    this._plantFilterService.setSearchQuery(this.searchQuery);
  }

}
