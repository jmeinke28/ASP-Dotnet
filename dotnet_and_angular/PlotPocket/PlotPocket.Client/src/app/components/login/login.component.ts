import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  // Form controls
  email = new FormControl<string>('', [Validators.required, Validators.email]);
  password = new FormControl<string>('', [Validators.required]);

  // Group the form controls
  form = new FormGroup({
    email: this.email,
    password: this.password,
  });

  errorMessage: string = '';

  private _authService = inject(AuthService);
  private _router = inject(Router);

  onSubmit(event: Event) {
    event.preventDefault();

    const emailValue = this.email.value?.trim() || '';
    const passwordValue = this.password.value?.trim() || '';

    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    this._authService.login(emailValue, passwordValue).subscribe({
      next: (user: any) => {
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
        console.log('Login request validated, you are now logged in');
      },
    });
  }
}
