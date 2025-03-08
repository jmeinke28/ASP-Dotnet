import { Component, OnInit } from '@angular/core';
import { PhoneDbService } from '../../services/phone-db.service';
import { Phone } from '../../models/phone';

@Component({
  selector: 'app-phone-list',
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent implements OnInit {
  phones: Phone[] = [];

  constructor(private phoneDbService: PhoneDbService) {}

  ngOnInit(): void {
    this.phoneDbService.loadDb().subscribe(db => {
      this.phones = Object.values(db);
    });
  }
}