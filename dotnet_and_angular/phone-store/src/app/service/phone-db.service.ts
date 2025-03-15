import { Injectable } from '@angular/core';
import { PHONES } from '../mock-db/phones';
import { PhoneDb } from '../models/phone-db';
import { Phone } from '../models/phone';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhoneDbService {
  private phoneDbKey = 'phone-db';
  private phoneDb: PhoneDb | null = null;
  private intialDb: PhoneDb = PHONES;
  snapshot: any;

  constructor() {
    this.loadDb().subscribe(db => {
      this.phoneDb = db;
    });
   }

   private initializePhoneDb(phoneDbFromLocalStroage: string | null): PhoneDb {
    // Check if phoneDbFromLocalStroage is null
    if (!phoneDbFromLocalStroage){
      return this.intialDb;
    }

    const parsedObj = JSON.parse(phoneDbFromLocalStroage);

    // Check that it is a valid PhoneDb with values inside it
    return (this.isValidPhoneDb(parsedObj) ? parsedObj as PhoneDb : this.intialDb);
  }

  private isValidPhoneDb(parsedObj: any): parsedObj is PhoneDb {
    return ( (parsedObj && typeof parsedObj === 'object') ?
            // Check each key's value to ensure it's a valid Phone
            Object.keys(parsedObj).every(key => this.isValidPhone(parsedObj[key]))
            : false
          );
  }

  private isValidPhone(parsedObj: any): parsedObj is Phone {
    return typeof parsedObj.id === 'string' &&
           typeof parsedObj.brand === 'string' &&
           typeof parsedObj.model === 'string' &&
           typeof parsedObj.releaseYear === 'number' &&
           typeof parsedObj.operatingSystem === 'string';
  }

  /*
	  Below are the public methods which you will interact with in order
	  to perform the operations needed for the application.s
  */

  public saveDb(): void {
    localStorage.setItem(this.phoneDbKey, JSON.stringify(this.phoneDb));
  }

  public loadDb(): Observable<PhoneDb> {
    const db: string | null = localStorage.getItem(this.phoneDbKey);
    return of(this.initializePhoneDb(db));
  }

  public updatePhone(phone: Phone | null): boolean {
    let wasSuccessful: boolean = false;

    if(this.phoneDb && phone && phone.id) {
      this.phoneDb[phone.id] = phone;
      this.saveDb();

      wasSuccessful = true;
    }

    return wasSuccessful;
  }

  public getPhone(id: string | null): Observable<Phone | null> {
    let phone: Phone | null = null;
    if(id && this.phoneDb) {
      phone = (this.phoneDb[id] ? this.phoneDb[id] : null);
    }

    return of(phone);
  }
}