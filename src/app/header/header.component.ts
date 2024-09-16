/**
 * @file header.component.ts
 * @description Component responsible for the header of the application. It provides navigation functionality
 * to the profile, favorites, and handles user logout.
 */

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  /**
   * @constructor
   * @param {Router} router - Angular Router service for navigating between application routes.
   * @param {AuthService} authService - Service that manages authentication state and handles login/logout operations.
   */

  constructor(private router: Router, private authService: AuthService) {}

  /**
   * @method goToProfile
   * @description Navigates the user to their profile page.
   */

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * @method goToFavorites
   * @description Navigates the user to the favorites page.
   */

  goToFavorites(): void {
    this.router.navigate(['favorites']);
  }

  /**
   * @method logout
   * @description Logs the user out of the application and navigates back to the welcome page.
   */

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
