import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css',
})
export class FilterComponent {
  private _dataService = inject(DataService);

  public data: number[] = this._dataService.data;

  public filteredData: number[] = [] as number[];

  public data$: Observable<number> = this._dataService.dataStream$.pipe(
    filter((elem) => {
      return elem % 2 === 0;
    })
  );

  public applyFilter(): void {
    this.data$.subscribe((elem) => {
      /**
       * You'll notice in this example, unlike in the tap() component example,
       * we are not having to do have a class variable:
       *
       *    private _cdr = inject(ChangeDetectorRef);
       *
       * And then subsequently call the following inside of this applyFilter() method:
       *    this._cdr.detectChanges();
       *
       * This is because Angular only detects changes during its change detection cycle,
       * which is triggered by:
       *
       *  => User interaction events (e.g., click).
       *  => Asynchronous operations (e.g., Promises, Observables, etc.).
       *  => Bound template expressions.
       *
       * However, if you modify a value inside a callback (e.g., tap()), it happens
       * outside of Angular's change detection cycle. Angular doesn't know a change
       * occurred unless:
       *
       *  => You trigger it manually with ChangeDetectorRef.detectChanges() or markForCheck().
       *  => You use a mechanism like a BehaviorSubject or EventEmitter to notify Angular of the change.
       *
       * Therefore, with tap(), we had to make the manual call to detectChanges().
       *
       */
      this.filteredData.push(elem);
    });
  }
}
