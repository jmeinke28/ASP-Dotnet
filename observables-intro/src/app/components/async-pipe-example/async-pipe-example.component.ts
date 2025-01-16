import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-async-pipe-example',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './async-pipe-example.component.html',
  styleUrl: './async-pipe-example.component.css',
})
export class AsyncPipeExampleComponent implements OnInit {
  private _dataService = inject(DataService);

  public dataArr$: Observable<number[]> = new Observable<number[]>();

  ngOnInit(): void {
    // No subscription here as the async pipe in the html will subscribe.
    this.dataArr$ = this._dataService.getAllData();
  }
}
