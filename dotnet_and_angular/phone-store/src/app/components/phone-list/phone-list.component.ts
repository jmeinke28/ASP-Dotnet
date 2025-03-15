import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-phone-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './phone-list.component.html',
  styleUrls: ['./phone-list.component.css']
})

export class PhoneListComponent {

}