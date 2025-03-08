import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PhoneListComponent } from './pages/phone-list/phone-list.component';
import { PhoneDetailsComponent } from './pages/phone-details/phone-details.component';

const routes: Routes = [
  { path: '', component: HomeComponent }, // Home route
  { path: 'phones', component: PhoneListComponent },
  { path: 'phones/:id', component: PhoneDetailsComponent },
  { path: '**', redirectTo: '' } // Redirect to Home for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }