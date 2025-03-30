import { Component, inject, OnInit } from '@angular/core';
import { PhoneDbService } from '../../service/phone-db.service';
import { Phone } from '../../models/phone';
import { ActivatedRoute, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-phone-details',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.css']
})
export class PhoneDetailsComponent implements OnInit {

  public phone: Phone | null = null;
  public isEditing: boolean = false; 

  private _route = inject(ActivatedRoute);
  private _phoneDbService = inject(PhoneDbService);
  private router = inject(Router);

  ngOnInit(): void {
    this.getPhone();
  }

  public getPhone(): void {
    const phoneId: string | null = this._route.snapshot.paramMap.get('phoneId');

    if (phoneId) {
      this._phoneDbService.getPhone(phoneId).subscribe(phone => {
        if (phone) {
          this.phone = phone;
        }
      });
    }
  }

  public toggleEditMode(): void {
    this.isEditing = !this.isEditing;
  }

  public savePhone(): void {
    if (this.phone) {
      const success = this._phoneDbService.updatePhone(this.phone);
      if (success) {
        alert('Phone details saved successfully!');
      } else {
        alert('Failed to save phone details.');
      }
      this.router.navigate([`/phones/${this.phone.id}`]);
    }
  }
}