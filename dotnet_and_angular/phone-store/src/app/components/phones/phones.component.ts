import { Component, inject, OnInit } from '@angular/core';
import { PhoneDbService } from '../../service/phone-db.service';
import { Phone } from '../../models/phone';
import { PhoneCardComponent } from "../phone-card/phone-card.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-phones',
  imports: [CommonModule, PhoneCardComponent],
  templateUrl: './phones.component.html',
  styleUrls: ['./phones.component.css'] 
})
export class PhonesComponent implements OnInit {
  private _phoneDb = inject(PhoneDbService);

  public phones: Phone[] = [] as Phone[];

  ngOnInit(): void {
    this._phoneDb.loadDb().subscribe((db) => {
      this.phones = Object.values(db);
    });
  }
}