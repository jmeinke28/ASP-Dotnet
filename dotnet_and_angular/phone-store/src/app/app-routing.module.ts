import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PhoneListComponent } from './pages/phone-list/phone-list.component';
import { PhoneDetailsComponent } from './pages/phone-details/phone-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Default route (Home page)
  { path: 'phones', component: PhoneListComponent }, // Phone List page
  { path: 'phones/:id', component: PhoneDetailsComponent }, // Phone Details page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }