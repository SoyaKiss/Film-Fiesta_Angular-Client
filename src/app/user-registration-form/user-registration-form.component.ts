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
  selector: 'app-user-registration-form',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
  ],
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss'],
})
export class UserRegistrationFormComponent {
  @Input() userData = {
    Username: '',
    Password: '',
    Email: '',
    Birthday: '',
    fullName: '',
  };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  // Function to handle user registration
  registerUser(): void {
    if (!this.userData.fullName) {
      console.error('Full Name is Required');
      this.snackBar.open('Full Name is required.', 'OK', {
        duration: 2000,
      });

      return;
    }

    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        // Save the token and user data to localStorage upon successful registration
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        console.log('Registration successful:', response);
        console.log(
          'Token saved in localStorage:',
          localStorage.getItem('token')
        ); // Debug log to confirm token storage

        this.dialogRef.close(); // Close the dialog

        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000,
        });
      },
      (error) => {
        console.error('Registration failed:', error); // Log the error response
        this.snackBar.open('Registration failed. Please try again.', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
