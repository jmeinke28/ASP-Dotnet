import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { filter, map, Observable, tap } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-chaining-operators',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chaining-operators.component.html',
  styleUrl: './chaining-operators.component.css',
})
export class ChainingOperatorsComponent {
  private _dataService = inject(DataService);
  public data: number[] = this._dataService.data;

  public tapInitalData: number[] = [] as number[];
  public mapInitalData: number[] = [] as number[];
  public filterInitalData: number[] = [] as number[];

  public data$: Observable<number> = this._dataService.dataStream$.pipe(
    tap((elem) => {
      this.tapInitalData.push(elem);

      /**
       * Uncomment the return to see that though no error will result
       * from returning from tap(), the value returned will always be
       * ignored downstream.
       */
      // return elem * 4;
    }),
    map((elem) => {
      /**
       * This is breaking the philosophy of map() of *not* causing side-effects; however,
       * this is demonstrating that side-effects can be done - it just breaks the expected
       * behavior you are supposed to abide by for this function. The expected behavior
       * is that map() does not cause side-effects, but instead *only* effects the stream
       * of data it receives as a parameter, and *nothing* outside of this scope. This would
       * include *not* doing a console log in map() since this has effects outside of the scope
       * of this function.
       */
      this.mapInitalData.push(elem);

      return elem * 2;
    }),
    filter((elem) => {
      /**
       * This is breaking the philosophy of filter() of *not* causing side-effects; however,
       * this is demonstrating that side-effects can be done - it just breaks the expected
       * behavior you are supposed to abide by for this function. The expected behavior
       * is that filter() does not cause side-effects, but instead *only* effects the stream
       * of data it receives as a parameter, and *nothing* outside of this scope. This would
       * include *not* doing a console log in filter() since this has effects outside of the scope
       * of this function.
       */
      this.filterInitalData.push(elem);

      return elem % 2 == 0;
    })
  );

  public runChain(): void {
    this.data$.subscribe();
  }
}
