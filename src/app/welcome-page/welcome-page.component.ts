import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { Router, RouterModule } from '@angular/router';

import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';

import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [MatDialogModule, RouterModule, MatButtonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Check if the user is already logged in and navigate to movies if true
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['movies']);
    }
  }

  // Method to open the registration dialog
  openUserRegistrationDialog(): void {
    const dialogRef = this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });

    dialogRef.afterClosed().subscribe(() => {
      // Handle any actions needed after registration dialog closes
    });
  }

  // Method to open the login dialog
  openUserLoginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.authService.login(); // Set the login state to true
        this.router.navigate(['movies']); // Navigate directly to movies after successful login
      }
    });
  }
}
