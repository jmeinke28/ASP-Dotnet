import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(event: Event) {
    event.preventDefault();
    console.log("Log in event");
    const emailValue = this.email.value?.trim() || '';
    const passwordValue = this.password.value?.trim() || '';

    this.authService.login(emailValue, passwordValue).subscribe({
      next: (user: any) => {
        this.authService.setUser(user);
        this.router.navigate(['/wordgame']);
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'Login failed. Please try again.';
        console.error('Login error:', err);
      },
    });
  }
}