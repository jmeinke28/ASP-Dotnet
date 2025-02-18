import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { DataService } from '../../services/data.service';
import { ExpansionCase } from '@angular/compiler';

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

  

  ngOnInit(): void {
    // this.fillRegularArray();

    const unicastObservable$ = new Observable((subscriber: Subscriber<any>) => {
      console.log('In the observable!!!');
      subscriber.next(8);      

    });

    unicastObservable$.subscribe({
      next: (data) => {console.log('In the next! Data:', data)},
      error: (error) => console.error('Error occurred:', error),
      complete: () => console.log('Observable completed!')
    });

    unicastObservable$.subscribe({
      next: (data) => {console.log('In the next! Data:', data)},
      error: (error) => console.error('Error occurred:', error),
      complete: () => console.log('Observable completed!')
    });



    

  }

  public fillRegularArray(): void {
    this._dataService.getDataAndManipulate().subscribe((res) => {
      this.resultArr.push(res);
    });
  }
}
