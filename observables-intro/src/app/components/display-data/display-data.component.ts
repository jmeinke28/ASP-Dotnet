import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './display-data.component.html',
  styleUrl: './display-data.component.css',
})
export class DisplayDataComponent implements OnInit {
  private _apiService = inject(ApiService);
  public apiDataFromSubject$: Observable<any> = this._apiService.apiData$;
  
  ngOnInit(): void {
    if (!this._apiService.apiData) {
      this._apiService.webCallFillSubject().subscribe();
    }
  }
}
