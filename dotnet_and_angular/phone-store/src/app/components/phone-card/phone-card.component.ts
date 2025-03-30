import { Component, inject, Input, input } from '@angular/core';
import { Router } from '@angular/router';
import { Phone } from '../../models/phone';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-phone-card',
  standalone: true,
  imports: [NgIf],
  templateUrl: './phone-card.component.html',
  styleUrl: './phone-card.component.css'
})
export class PhoneCardComponent {
  private _router = inject(Router);

  @Input() phone: Phone | null = null;

  public select(phone: Phone): void {
    this._router.navigate([`/phones/${phone.id}`]);
  }

}
