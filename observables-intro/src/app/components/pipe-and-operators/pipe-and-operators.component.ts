import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-pipe-and-operators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pipe-and-operators.component.html',
  styleUrl: './pipe-and-operators.component.css',
})
export class PipeAndOperatorsComponent implements OnInit {
  private _dataService = inject(DataService);
  public dataStream$: Observable<number> = this._dataService.dataStream$;
  public resultArr: number[] = [] as number[];

  // Will hold the result array
  private _resultSubject = new BehaviorSubject<number[]>([]);

  // Expose the BehaviorSubject as an Observable
  public resultArr$: Observable<number[]> = this._resultSubject.asObservable();

  ngOnInit(): void {
    this.fillRegularArray();
    // this.fillBehaviorSubject();
  }

  public fillRegularArray(): void {
    this._dataService.getDataAndManipulate().subscribe((res) => {
      console.log('home component result from getDataAndManipulate():', res);
      this.resultArr.push(res);
    });
  }

  public fillBehaviorSubject(): void {
    this._dataService.getDataAndManipulate().subscribe((res) => {
      console.log('Received:', res);
      // Get current value from BehaviorSubject.
      const currentArr = this._resultSubject.value;

      // Add new value and update the BehaviorSubject with new value.
      // The calling of next() will cause the BehaviorSubject to emit.
      this._resultSubject.next([...currentArr, res]);
    });
  }
}
