import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Phone } from '../models/phone';

@Injectable({
  providedIn: 'root'
})
export class PhoneDataService {
  private selectedPhoneSubject = new BehaviorSubject<Phone | null>(null);
  selectedPhone$ = this.selectedPhoneSubject.asObservable();

  setSelectedPhone(phone: Phone): void {
    this.selectedPhoneSubject.next(phone);
  }

  clearSelectedPhone(): void {
    this.selectedPhoneSubject.next(null);
  }
}