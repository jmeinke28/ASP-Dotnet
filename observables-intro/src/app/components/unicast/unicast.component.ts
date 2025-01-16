import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-unicast',
  standalone: true,
  imports: [],
  templateUrl: './unicast.component.html',
  styleUrl: './unicast.component.css',
})
export class UnicastComponent implements OnInit {
  ngOnInit(): void {
    const unicastObservable$ = new Observable((subscriber) => {
      // Simulate an asynchronous operation
      setTimeout(() => {
        // Emit a random value
        subscriber.next(Math.random());
      }, 1000);
    });

    // Subscribing to the Observable twice
    unicastObservable$.subscribe((value) =>
      console.log(`Observable Subscriber 1: ${value}`)
    );
    unicastObservable$.subscribe((value) =>
      console.log(`Observable Subscriber 2: ${value}`)
    );
  }
}
