import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PhoneDbService } from '../../services/phone-db.service';
import { Phone } from '../../models/phone';

@Component({
  selector: 'app-phone-details',
  templateUrl: './phone-details.component.html',
  styleUrls: ['./phone-details.component.css']
})
export class PhoneDetailsComponent implements OnInit {
  phone: Phone | null = null;
  isEditing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private phoneDbService: PhoneDbService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.phoneDbService.getPhone(id).subscribe(phone => {
        this.phone = phone;
      });
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    if (this.phone) {
      this.phoneDbService.updatePhone(this.phone);
      this.isEditing = false;
    }
  }
}