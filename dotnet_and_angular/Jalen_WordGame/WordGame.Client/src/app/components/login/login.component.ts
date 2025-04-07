import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = new FormControl<string>('', [Validators.required, Validators.email]);
  password = new FormControl<string>('', [Validators.required]);
  errorMessage: string = '';
  private _authService = inject(AuthService);
  private _router = inject(Router);

  onSubmit(event: Event) {
    event.preventDefault();
    console.log('Log in form submitted');
    console.log('Email:', this.email.value);

    const emailValue = this.email.value?.trim() || '';
    const passwordValue = this.password.value?.trim() || '';

    console.log('Sending login data to AuthService');
    this._authService.login(emailValue, passwordValue).subscribe({
      next: (user: any) => {
        console.log('Login successful, user data:', user);
        this._authService.setUser(user);
        console.log('Redirecting to /wordgame');
        this._router.navigate(['/wordgame']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        console.error('Login error:', err);
        console.log('Error message set to:', this.errorMessage);
      },
    });
  }
}