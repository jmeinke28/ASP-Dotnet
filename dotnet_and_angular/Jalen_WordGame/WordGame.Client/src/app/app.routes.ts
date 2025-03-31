import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GameStatusComponent } from './components/game-status/game-status.component'; // Add this if you have a game status page

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Homepage when the user is not logged in
  { path: 'auth/login', component: LoginComponent }, // Login page
  { path: 'auth/register', component: RegisterComponent }, // Register page
  { path: 'wordgame', component: GameStatusComponent }, // Game status page (ensure this exists)
  { path: '**', redirectTo: '', pathMatch: 'full' }, // Wildcard route for page not found
];
