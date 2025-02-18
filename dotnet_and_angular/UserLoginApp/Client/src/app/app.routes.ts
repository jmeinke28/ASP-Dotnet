import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SecretComponent } from './secret/secret.component';
import { authGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'secret', component: SecretComponent, canActivate: [authGuard] },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },

  { path: '**', redirectTo: '' },
];
