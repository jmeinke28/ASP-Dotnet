import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  /**
   * The ! operator at the end of the variable tells TypeScript that we
   * guarantee that the property will be assigned before it is accessed.
   * This allows us to not have to do | undefined.
   * */
  @ViewChild('loginNgForm') loginNgForm!: NgForm;
  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _formBuilder = inject(FormBuilder);
  public loginForm: FormGroup;
  public message: string = '';

  // convenience getter for easy access to form fields
  get controls() {
    return this.loginForm.controls;
  }

  constructor() {
    this.loginForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  login(): void {
    // Return if the form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    // Disable the form
    this.loginForm.disable();

    // Sign in
    this._authService.login(this.loginForm.value).subscribe({
      next: (resp) => {
        // Navigate to the home route
        this._router.navigate(['']);
      },
      error: (err) => {
        // Re-enable the form
        this.loginForm.enable();

        /**
         * By using the ngForm directive from the FormsModule,
         * we are able to have this convenient way to reset
         * the form. We could use this.loginForm.reset() to
         * reset the form as well, but the ngForm.resetForm() method
         * resets both the form controls and the validation states more
         * thoroughly than FormGroup.reset().
         */
        // Reset the form
        this.loginNgForm.resetForm();

        // Set the error message
        this.message = 'Wrong email or password';
      },
    });
  }
}
