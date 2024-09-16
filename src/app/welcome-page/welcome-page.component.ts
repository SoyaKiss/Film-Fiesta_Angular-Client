/**
 * @file welcome-page.component.ts
 * @description The WelcomePageComponent serves as the landing page for the Angular application. It manages the display
 * of registration and login dialogs and handles navigation based on user authentication status.
 */

import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../auth.service';

/**
 * @class WelcomePageComponent
 * @implements {OnInit}
 * @description Component for the welcome page. It includes methods to open registration and login dialogs
 * and navigates users based on their authentication status.
 */

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [MatDialogModule, RouterModule, MatButtonModule],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent implements OnInit {
  /**
   * @constructor
   * @param {MatDialog} dialog - Service to open modal dialogs.
   * @param {Router} router - Service to navigate between views.
   * @param {AuthService} authService - Service to handle user authentication.
   */
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {}
  /**
   * @method ngOnInit
   * @description Lifecycle hook that runs when the component is initialized. It checks if the user is authenticated
   * and navigates to the movies page if the user is already logged in.
   */

  ngOnInit(): void {
    // Check if the user is already logged in and navigate to movies if true
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['movies']);
    }
  }

  /**
   * @method openUserRegistrationDialog
   * @description Opens the user registration dialog, allowing users to register for an account.
   */

  openUserRegistrationDialog(): void {
    const dialogRef = this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });

    dialogRef.afterClosed().subscribe(() => {
      // Handle any actions needed after registration dialog closes
    });
  }

  /**
   * @method openUserLoginDialog
   * @description Opens the user login dialog. If login is successful, updates authentication status and navigates to the movies page.
   */

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
