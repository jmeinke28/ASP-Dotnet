import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Import the routing module
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PhoneListComponent } from './pages/phone-list/phone-list.component';
import { PhoneDetailsComponent } from './pages/phone-details/phone-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, // Ensure this is present
    PhoneListComponent,
    PhoneDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }