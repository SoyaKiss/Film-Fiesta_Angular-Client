import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // Import the service to fetch user data
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
  user: any = {}; // Placeholder for user data

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar, // Inject MatSnackBar to show error messages
    private router: Router // Inject Router
  ) {}

  ngOnInit(): void {
    this.getUserInfo(); // Fetch user information when the component initializes
  }

  // Method to get user information
  getUserInfo(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}'); // Fetch user data from local storage
    const username = user.Username || localStorage.getItem('username'); // Check for username from user data or fallback

    if (username) {
      // Fetch user information using the username
      this.fetchApiData.getUser(username).subscribe(
        (resp: any) => {
          this.user = resp; // Assign the response data to the user object
        },
        (error) => {
          console.error('Error fetching user information:', error);
          this.snackBar.open('Error fetching user information.', 'OK', {
            duration: 3000,
          });
        }
      );
    } else {
      // Handle the case where the username is not found in local storage
      console.error('Username not found in local storage.');
      this.snackBar.open('Please log in again.', 'OK', { duration: 3000 });
      this.router.navigate(['login']); // Redirect to login if the username is missing
    }
  }

  // Method to edit user profile
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
  // Method to delete user account
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
