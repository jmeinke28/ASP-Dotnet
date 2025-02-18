import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
})
export class NavComponent implements OnInit {
  private _authService = inject(AuthService);
  private _router = inject(Router);
  public isLoggedIn: boolean = false;
  
  ngOnInit(): void {
    this._authService.user$.subscribe((res) => {
      this.isLoggedIn = !!res;
    });
  }

  public logout(): void {
    this._authService.logout().subscribe(() => {
      this._router.navigate(['/auth/login']);
    });
  }
}
