import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email = new FormControl<string>('', [Validators.required, Validators.email]);
  password = new FormControl<string>('', [Validators.required]);
  confirmPassword = new FormControl<string>('', [Validators.required]);
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();

    console.log('Form submitted'); // Debugging log

    if (this.password.value !== this.confirmPassword.value) {
      this.errorMessage = 'Passwords do not match';
      console.log('Password mismatch'); // Debugging log
      return;
    }

    const emailValue = this.email.value?.trim() || '';
    const passwordValue = this.password.value?.trim() || '';

    console.log('Email value:', emailValue); // Debugging log
    console.log('Password value:', passwordValue); // Debugging log

    this.authService.register(emailValue, passwordValue).subscribe({
      next: () => {
        console.log('Registration successful'); // Debugging log
        this.router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.errorMessage =
          err.error?.message || 'Registration failed. Please try again.';
        console.error('Registration error:', err); // Error logging
      },
    });
  }
}
