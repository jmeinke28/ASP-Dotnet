import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Router } from '@angular/router';
import { AuthService, User } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
})
export class NavigationComponent {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  user$: Observable<User | null> = this._authService.user$;

  logout() {
    this._authService.logout().subscribe(() => {
      this._router.navigate(['/auth/login']);
    });
  }
}
