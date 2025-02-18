import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

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
    
    

    // // Simulate an asynchronous operation that emits a value
    // setTimeout(() => {
    //   // Generate a random value
    //   const randomValue = Math.random();
    //   // Emit the random value to all subscribers
    //   subject.next(randomValue);
    //   // Signal completion
    //   subject.complete();
    // }, 1000);

    // // Subscribing to the Subject twice
    // subject.subscribe((value) => console.log(`Subject Subscriber 1: ${value}`));
    // subject.subscribe((value) => console.log(`Subject Subscriber 2: ${value}`));
    // subject.next(8);
    

    // const behaviorSubject: BehaviorSubject<number> = new BehaviorSubject(0);
    // behaviorSubject.subscribe((value) => console.log(`behaviorSubject Subscriber 1: ${value}`));
    // behaviorSubject.next(8);

    // behaviorSubject.next(9);
    // behaviorSubject.subscribe((value) => console.log(`behaviorSubject Subscriber 2: ${value}`));

  }
}
