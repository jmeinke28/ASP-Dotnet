import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { EMPTY, Observable, tap } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-request-data',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './request-data.component.html',
  styleUrl: './request-data.component.css',
})
export class RequestDataComponent implements OnInit {
  private _apiService = inject(ApiService);
  public apiDataFromSubject$: Observable<any> = this._apiService.apiData$;

  public apiDataFromComp$: Observable<any> = EMPTY;
  public apiDataFromSubjectLoading: boolean = false;
  public apiDataFromCompLoading: boolean = false;

  ngOnInit(): void {}

  getApiData(): void {
    // this._dataService.webCall();
    this.apiDataFromCompLoading = true;
    this.apiDataFromComp$ = this._apiService.webCall().pipe(
      tap(() => {
        this.apiDataFromCompLoading = false;
      })
    );
  }

  getApiDataAndDisplayJson(): void {
    // this._dataService.webCall();
    this.apiDataFromSubjectLoading = true;
    this._apiService.webCallFillSubject().subscribe((res) => {
      this.apiDataFromSubjectLoading = false;
    });
  }

  public clear(): void {
    this._apiService.clearData();
  }
}
