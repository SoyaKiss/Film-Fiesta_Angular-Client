/**
 * @file profile.component.ts
 * @description Component that handles displaying and managing user profile information, including fetching user data,
 * updating profile details, and deleting the user account.
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  /**
   * @property {any} user - Object containing user profile data.
   */

  user: any = {};

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service to handle API requests for user data.
   * @param {MatSnackBar} snackBar - Service to display notifications.
   * @param {Router} router - Service for navigation between routes.
   */

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  /**
   * @method ngOnInit
   * @description Lifecycle hook that runs when the component is initialized. It fetches the user information.
   */

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * @method getUserInfo
   * @description Fetches the user information from local storage and updates the user object. If the username is missing,
   * it redirects to the login page.
   */

  getUserInfo(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = user.Username || localStorage.getItem('username');

    if (username) {
      this.fetchApiData.getUser(username).subscribe(
        (resp: any) => {
          this.user = resp;
        },
        (error) => {
          console.error('Error fetching user information:', error);
          this.snackBar.open('Error fetching user information.', 'OK', {
            duration: 3000,
          });
        }
      );
    } else {
      console.error('Username not found in local storage.');
      this.snackBar.open('Please log in again.', 'OK', { duration: 3000 });
      this.router.navigate(['login']);
    }
  }

  /**
   * @method editProfile
   * @description Allows the user to update their profile information. Sends the updated details to the server and updates
   * the user object locally if the update is successful.
   */

  editProfile(): void {
    const username = localStorage.getItem('username');
    if (username) {
      const updatedDetails: any = {
        Username: this.user.Username,
        Email: this.user.Email,
        fullName: this.user.fullName,
        Birthday: this.user.Birthday,
      };

      // Include password only if it is being updated
      if (this.user.Password) {
        updatedDetails.Password = this.user.Password;
      }

      this.fetchApiData.editUser(username, updatedDetails).subscribe(
        (resp) => {
          this.user = resp.user;
          // Check if a new token is returned and update it in local storage
          if (resp.token) {
            localStorage.setItem('token', resp.token);
          }

          this.snackBar.open('Profile updated successfully!', 'OK', {
            duration: 3000,
          });
        },
        (error) => {
          console.error('Error updating profile:', error);
          this.snackBar.open('Error updating profile.', 'OK', {
            duration: 3000,
          });
        }
      );
    }
  }

  /**
   * @method deleteAccount
   * @description Deletes the user account after confirming the action. If successful, clears local storage and redirects
   * to the welcome page. Handles errors by showing appropriate messages and handling session expiration.
   */

  deleteAccount(): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );

    if (!confirmed) {
      return; // Exit if the user cancels the action
    }

    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.deleteUser(username).subscribe(
        (resp) => {
          // Handle the response correctly
          console.log('Account deleted successfully:', resp);
          this.snackBar.open(resp, 'OK', {
            duration: 3000,
          });

          // Clear local storage and redirect to the welcome page (default route)
          localStorage.clear();
          window.location.href = '/'; // Redirects to the default route which is the WelcomePageComponent
        },
        (error) => {
          console.error('Error deleting account:', error);
          this.snackBar.open(
            'Error deleting account. Please try again later.',
            'OK',
            {
              duration: 3000,
            }
          );

          if (error.status === 401) {
            this.snackBar.open('Session expired. Please log in again.', 'OK', {
              duration: 3000,
            });
            localStorage.clear();
            window.location.href = '/'; // Redirects to the WelcomePageComponent
          }
        }
      );
    }
  }
}
