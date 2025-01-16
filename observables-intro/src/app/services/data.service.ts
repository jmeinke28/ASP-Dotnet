import { Injectable } from '@angular/core';
import { filter, from, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  public dataStream$: Observable<number> = from([10, 11, 12, 13, 14, 15, 16]);

  public data$: Observable<number[]> = of([10, 11, 12, 14, 15, 16]);

  constructor() {}

  public getDataStream(): Observable<number> {
    return this.dataStream$;
  }

  public getAllData(): Observable<number[]> {
    return this.data$;
  }

  public getDataAndManipulate(): Observable<number> {
    return this.dataStream$.pipe(
      tap((val) => {
        console.log('tap initial:', val);
        /**
         * Uncomment the below to see how even if we return from tap() the return
         * value from tap() is ignored because tap() is meant to *only* perform side-effects,
         * and thus anything returned from it is ignored.
         */
        // const retVal = val * 100;
        // console.log('tap retVal:', retVal);
        // return retVal;
      }),
      map((val) => {
        console.log('---------------------------------');
        console.log('map initial:', val);
        const retVal = val + 2;
        console.log('map retVal:', retVal);

        return retVal;
      }),
      filter((val) => {
        console.log('---------------------------------');
        console.log('filter initial:', val);
        console.log('=================================');
        return val % 2 == 0;
      })
    );
  }
}
