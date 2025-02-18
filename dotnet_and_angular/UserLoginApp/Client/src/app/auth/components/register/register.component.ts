import { Component, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { SuccessSnackBarComponent } from '../success-snack-bar/success-snack-bar.component';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  @ViewChild('registerNgForm') registerNgForm!: NgForm;
  private _snackBar = inject(MatSnackBar);
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _formBuilder = inject(FormBuilder);

  public registerForm: FormGroup;
  public errorMessages: string = '';

  constructor() {
    this.registerForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  public get controls() {
    return this.registerForm.controls;
  }

  private openSnackBar(): void {
    this._snackBar.openFromComponent(SuccessSnackBarComponent, {
      duration: 3000,
      verticalPosition: 'top',
      data: {
        message: 'Registration successful!',
      },
    });
  }

  public register(): void {
    // Return if the form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // Disable the form
    this.registerForm.disable();

    this._authService.register(this.registerForm.value).subscribe({
      next: (resp) => {
        this.openSnackBar();
        this._router.navigate(['/auth/login']);
      },
      error: (err) => {
        this.registerForm.enable();

        this.registerNgForm.resetForm();

        this.errorMessages = err.error.errors;
      },
    });
  }
}
