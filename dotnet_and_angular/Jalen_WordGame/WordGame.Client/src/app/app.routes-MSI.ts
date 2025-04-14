import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { GameViewComponent } from './components/game-view/game-view.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'wordgame', component: GameListComponent, canActivate: [authGuard] },
  {
    path: 'wordgame/:gameId',
    component: GameViewComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
