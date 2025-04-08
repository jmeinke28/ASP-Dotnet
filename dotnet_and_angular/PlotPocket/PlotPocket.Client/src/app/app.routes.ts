import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];
