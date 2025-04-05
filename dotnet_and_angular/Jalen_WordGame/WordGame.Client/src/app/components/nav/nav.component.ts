import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  authService = inject(AuthService);
  router = inject(Router); 
  user: User | null = null;

  ngOnInit() {
    this.authService.user$.subscribe(u => {
      this.user = u;
    });
  }

  onLogout() {
    this.authService.logout().subscribe({
      next: () => {
        this.authService.setUser(null);
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });
  }
  
  
}
