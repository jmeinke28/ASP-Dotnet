import { Component, inject } from '@angular/core';
import { Phone } from '../../models/phone';
import { PhoneDbService } from '../../service/phone-db.service';

@Component({
  selector: 'app-phone-list',
  imports: [],
  templateUrl: './phone-list.component.html',
  styleUrl: './phone-list.component.css'
})
export class PhoneListComponent {
  private _phoneDb = inject(PhoneDbService);

  public phones: Phone[] = [] as Phone[];

  ngOnInit(): void {
    this._phoneDb.loadDb().subscribe((db)=>{
      this.phones = Object.values(db);
    })
  }
}
