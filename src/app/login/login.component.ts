/**
 * @file login.component.ts
 * @description Component responsible for handling user login functionality. It allows users to input their
 * username and password, validates the credentials, and updates the authentication state using the AuthService.
 */

import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  /**
   * @property {string} username - Holds the username input from the user.
   * @property {string} password - Holds the password input from the user.
   */

  username: string = '';
  password: string = '';

  /**
   * @constructor
   * @param {AuthService} authService - Service that handles authentication state management.
   * @param {MatSnackBar} snackBar - Service used to display notifications to the user.
   */

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * @method onLogin
   * @description Method triggered when the user clicks the login button. Validates the username and password fields
   * and updates the authentication state through the AuthService.
   */

  onLogin(): void {
    // Simulate login validation; in real scenarios, validate with backend/API
    if (this.username && this.password) {
      this.authService.login(); // Update the auth service state to logged in
      this.snackBar.open('Logged in successfully!', 'OK', { duration: 2000 });
    } else {
      this.snackBar.open('Please enter valid credentials', 'OK', {
        duration: 2000,
      });
    }
  }
}
