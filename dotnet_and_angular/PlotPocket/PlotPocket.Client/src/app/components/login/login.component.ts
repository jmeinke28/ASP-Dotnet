import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = new FormControl<string>('', [Validators.required, Validators.email]);
  password = new FormControl<string>('', [Validators.required]);
  errorMessage: string = '';
  private _authService = inject(AuthService);
  private _router = inject(Router);

  onSubmit(event: Event) {
    event.preventDefault();

    const emailValue = this.email.value?.trim() || '';
    const passwordValue = this.password.value?.trim() || '';

    console.log('Login Attempt');
    console.log('Email:', emailValue);
    console.log('Password:', passwordValue);

    // Check if the form fields are valid
    if (this.email.invalid || this.password.invalid) {
      console.log('Form is invalid');
      return;
    }

    console.log('Form is valid, sending login request...');

    this._authService.login(emailValue, passwordValue).subscribe({
      next: (user: any) => {
        console.log('Login successful:', user);
        this._authService.setUser(user);
        this._router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login error:', err);
        this.errorMessage =
          err.error?.message || 'Login failed. Please try again.';
        console.log('Error message displayed:', this.errorMessage);
      },
      complete: () => {
        console.log('Login request completed');
      },
    });
  }
}
