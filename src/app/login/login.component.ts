import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { MatButtonModule } from '@angular/material/button'; // Import MatButtonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // CommonModule for basic Angular directives
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service'; // Import the AuthService

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
  // Properties to hold user input
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  // Method triggered when the user clicks the login button
  onLogin(): void {
    // Simulate login validation; in real scenarios, validate with backend/API
    if (this.username && this.password) {
      this.authService.login(); // Update the auth service state to logged in
      this.snackBar.open('Logged in successfully!', 'OK', { duration: 2000 }); // Optional feedback
    } else {
      this.snackBar.open('Please enter valid credentials', 'OK', {
        duration: 2000,
      });
    }
  }
}
