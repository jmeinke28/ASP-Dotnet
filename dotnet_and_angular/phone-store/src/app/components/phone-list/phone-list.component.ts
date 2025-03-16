import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PHONES } from '../../mock-db/phones'; // Adjust the path based on where phones.ts is located

@Component({
  selector: 'app-phone-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})
export class PhoneListComponent {
  phones = Object.values(PHONES); // Convert the object into an array for easier iteration
}
