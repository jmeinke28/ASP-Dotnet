import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit{

  private _route = inject(ActivatedRoute);

  public itemId: string | null = null;

  ngOnInit(): void {
    this.itemId = this._route.snapshot.paramMap.get('itemId');
  }

}