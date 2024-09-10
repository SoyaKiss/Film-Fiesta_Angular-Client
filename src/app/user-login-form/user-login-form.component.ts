import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-login-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
  ],
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss',
})
export class UserLoginFormComponent {
  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  // Function to handle user login
  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (response) => {
        // On success, save the token and user to localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.dialogRef.close(); // Close the dialog
        console.log('Login successful', response);
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000,
        });
      },
      (response) => {
        console.error('Login failed', response);
        this.snackBar.open(
          'Login failed. Please check your credentials.',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    );
  }
}
