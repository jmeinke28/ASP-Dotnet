import { Component, inject, OnInit } from '@angular/core';
import { PhoneDbService } from '../../service/phone-db.service';
import { Phone } from '../../models/phone';
import { NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-phone-details',
  imports: [NgIf],
  templateUrl: './phone-details.component.html',
  styleUrl: './phone-details.component.css'
})
export class PhoneDetailsComponent implements OnInit {

  public _route = inject(ActivatedRoute);
  private _phoneDbService = inject(PhoneDbService);

  public phone: Phone | null = null;

  ngOnInit(): void {
    this.getPhone();
  }

  public getPhone(): void {
    const phoneId: string | null =
    this._route.snapshot.paramMap.get('phoneId');

    if(phoneId){
      this._phoneDbService.getPhone(phoneId).subscribe(phone => {
        if(phone){
          this.phone = phone;
        }
      });
    }
  }

}
