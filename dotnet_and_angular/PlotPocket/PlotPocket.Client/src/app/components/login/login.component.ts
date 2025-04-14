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
    event.preventDefault(); // Prevent form submission to avoid page reload
  
    // Log when the submission starts
    console.log('Login form submitted');
    
    // Trim form values
    const emailValue = this.email.value?.trim() || '';
    const passwordValue = this.password.value?.trim() || '';
  
    // Log the trimmed values
    console.log('Trimmed Email:', emailValue);
    console.log('Trimmed Password:', passwordValue);
  
    // Check if the form is valid
    if (this.form.invalid) {
      console.log('Form is invalid, stopping submission');
      return;
    }
  
    console.log('Form is valid, attempting to log in...');
    
    // Call the login method from AuthService
    this._authService.login(emailValue, passwordValue).subscribe({
      next: (user: any) => {
        console.log('Login successful:', user);
        this._authService.setUser(user);
        this._router.navigate(['/']);
      },
      error: (err) => {
        console.error('Login error:', err);
        // Log the error message from the backend if available
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        console.log('Error message displayed:', this.errorMessage);
      },
      complete: () => {
        console.log('Login request completed');
      }
    });
  
    // Additional log to indicate that login was attempted
    console.log('Login attempt sent to the server...');
  }
  
}  
