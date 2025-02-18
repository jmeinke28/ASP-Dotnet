import { Component, inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-success-snack-bar',
  standalone: false,
  templateUrl: './success-snack-bar.component.html',
  styleUrl: './success-snack-bar.component.css',
})
export class SuccessSnackBarComponent {
  public snackBarRef = inject(MatSnackBarRef);
  public message: string = inject(MAT_SNACK_BAR_DATA)?.message ?? 'Success';
}
