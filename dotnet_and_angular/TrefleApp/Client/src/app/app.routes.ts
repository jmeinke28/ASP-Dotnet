import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PlantsComponent } from './components/plants/plants.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'plants', component: PlantsComponent },
];
