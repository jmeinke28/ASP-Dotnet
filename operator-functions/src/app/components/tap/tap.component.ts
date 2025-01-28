import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-tap',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tap.component.html',
  styleUrl: './tap.component.css',
})
export class TapComponent {
  private _dataService = inject(DataService);
  public messageA: string = 'Example A Initial Message!';
  public messageB: string = 'Example B Initial Message!';
  private _cdr = inject(ChangeDetectorRef);

  public data: number[] = this._dataService.data;
  public dataA: boolean = false;
  public dataB: boolean = false;

  public dataA$: Observable<number[]> = this._dataService.data$.pipe(
    tap((dataArr) => {
      console.log('Logging in Example A tap() function');
      this.messageA = `Message A set in tap() function!`;

      /**
       * Notify Angular that a change has happened (changing the value of 'message')
       * after the change detection has ran.
       *  */
      this._cdr.detectChanges();
    })
  );

  public dataB$: Observable<number[]> = this._dataService.data$.pipe(
    tap((dataArr) => {
      console.log('Logging in Example B tap() function');
      this.messageB = `Message B set in tap() function!`;

      /**
       * Notify Angular that a change has happened (changing the value of 'message')
       * after the change detection has ran.
       *  */
      this._cdr.detectChanges();

      // Note that this inner map() is the map() method on arrays in JavaScript,
      // not the RxJS map() function seen above.
      return dataArr.map((elem) => elem * 2);
    })
  );
}
