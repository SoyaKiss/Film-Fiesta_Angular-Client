import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // Import the service to fetch user data
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any = {}; // Placeholder for user data

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar // Inject MatSnackBar to show error messages
  ) {}

  ngOnInit(): void {
    this.getUserInfo(); // Fetch user information when the component initializes
  }

  // Method to get user information
  getUserInfo(): void {
    const username = localStorage.getItem('username'); // Fetch the username from local storage
    if (username) {
      // Fetch user information using the username
      this.fetchApiData.getUser(username).subscribe(
        (resp: any) => {
          this.user = resp; // Assign the response data to the user object
          console.log('User information fetched successfully:', this.user);
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
      // Optional: Redirect the user to the login page if needed
      // this.router.navigate(['/login']);
    }
  }

  // Method to edit user profile
  editProfile(): void {
    const username = localStorage.getItem('username'); // Fetch username
    if (username) {
      const updatedDetails = {
        Username: this.user.Username,
        Email: this.user.Email,
        Birthday: this.user.Birthday,
      };
      this.fetchApiData.editUser(username, updatedDetails).subscribe(
        (resp) => {
          this.user = resp;
          console.log('Profile updated successfully:', this.user);
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
    const username = localStorage.getItem('username'); // Fetch username
    if (username) {
      this.fetchApiData.deleteUser(username).subscribe(
        (resp) => {
          console.log('Account deleted successfully:', resp);
          this.snackBar.open('Account deleted successfully!', 'OK', {
            duration: 3000,
          });
          // Perform any necessary cleanup, such as logging out and redirecting
        },
        (error) => {
          console.error('Error deleting account:', error);
          this.snackBar.open('Error deleting account.', 'OK', {
            duration: 3000,
          });
        }
      );
    }
  }
}
