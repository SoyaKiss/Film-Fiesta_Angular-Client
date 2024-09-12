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
import { Router } from '@angular/router';

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
    public snackBar: MatSnackBar,
    private router: Router // Add Router to handle navigation
  ) {}

  // Function to handle user registration
  registerUser(): void {
    if (!this.userData.fullName) {
      this.snackBar.open('Full Name is required.', 'OK', { duration: 2000 });
      return;
    }

    this.fetchApiData.userRegistration(this.userData).subscribe(
      (response) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('username', response.user.Username); // Save the username here
        console.log('Registration successful:', response);
        this.snackBar.open('User registered successfully!', 'OK', {
          duration: 2000,
        });

        window.dispatchEvent(new Event('userAuthenticated'));
        this.dialogRef.close();
        this.router.navigate(['movies']);
      },
      (error) => {
        console.error('Registration failed:', error);
        this.snackBar.open('Registration failed. Please try again.', 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
