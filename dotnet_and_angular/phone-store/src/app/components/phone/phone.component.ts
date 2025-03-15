import { Component, inject, OnInit } from '@angular/core';
import { PhoneCardComponent } from '../phone-card/phone-card.component';
import { NgFor } from '@angular/common';
import { PhoneDbService } from '../../service/phone-db.service';
import { Phone } from '../../models/phone';

@Component({
  selector: 'app-phone',
  imports: [PhoneCardComponent, NgFor],
  templateUrl: './phone.component.html',
  styleUrl: './phone.component.css'
})
export class PhoneComponent implements OnInit {
private _phoneDbService = inject(PhoneDbService);

public phones: Phone[] = [] as Phone[];

ngOnInit(): void {
  this._phoneDbService.loadDb().subscribe((res)=>{
    return this.phones;
  })
}


}
