import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PhoneDetailsComponent } from './components/phone-details/phone-details.component';
import { PhoneListComponent } from './components/phone-list/phone-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PhoneComponent } from './components/phone/phone.component';
import { PhonesComponent } from './components/phones/phones.component';

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'phones', component: PhonesComponent},
  {path: 'phones/:Id', component: PhoneDetailsComponent },

  { path: '**', component: PageNotFoundComponent }

];
