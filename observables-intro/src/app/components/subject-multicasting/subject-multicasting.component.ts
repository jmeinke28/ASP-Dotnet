import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-subject-multicasting',
  standalone: true,
  imports: [],
  templateUrl: './subject-multicasting.component.html',
  styleUrl: './subject-multicasting.component.css',
})
export class SubjectMulticastingComponent implements OnInit {
  ngOnInit(): void {
    const subject = new Subject<number>();

    // Simulate an asynchronous operation that emits a value
    setTimeout(() => {
      const randomValue = Math.random(); // Generate a random value
      subject.next(randomValue); // Emit the random value to all subscribers
      subject.complete(); // Signal completion
    }, 1000);

    // Subscribing to the Subject twice
    subject.subscribe((value) => console.log(`Subject Subscriber 1: ${value}`));
    subject.subscribe((value) => console.log(`Subject Subscriber 2: ${value}`));
  }
}
