import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  searchQuery: string = '';
  placeHolder: string = 'Search...';

  search() {
    this.searchEvent.emit(this.searchQuery);
  }
}
