/**
 * @file user-login-form.component.ts
 * @description Component responsible for handling user login. It manages user input, interacts with the API for authentication,
 * and provides feedback through snack bar notifications.
 */

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
  /**
   * @property {object} loginData - Contains the user's login credentials.
   * @property {string} loginData.Username - The username entered by the user.
   * @property {string} loginData.Password - The password entered by the user.
   */

  @Input() loginData = { Username: '', Password: '' };

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service to handle API requests for user authentication.
   * @param {MatDialogRef<UserLoginFormComponent>} dialogRef - Reference to the dialog that opened this component.
   * @param {MatSnackBar} snackBar - Service to display snack bar notifications for feedback.
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  /**
   * @method loginUser
   * @description Handles the user login process by sending the login credentials to the API. Upon success, stores
   * the user's token and username locally and provides feedback through a snack bar notification.
   */

  loginUser(): void {
    this.fetchApiData.userLogin(this.loginData).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('username', response.user.Username); // Add this line to store the username separately
        this.dialogRef.close('success'); // Pass 'success' when login is successful
        this.snackBar.open('Login successful!', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Login failed', error);
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
