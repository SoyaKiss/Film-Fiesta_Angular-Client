/**
 * @file app.component.ts
 * @description The root component of the Angular application. It initializes the application, manages authentication state,
 * and updates the view based on the user's authentication status.
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../app/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

/**
 * @class AppComponent
 * @implements {OnInit, OnDestroy}
 * @description The main component of the application that handles authentication state and updates the UI accordingly.
 */

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  /**
   * @property {string} title - The title of the application.
   */

  title = 'Film-Fiesta-Angular-client';
  /**
   * @property {boolean} isAuthenticated - Tracks whether the user is currently authenticated.
   */

  isAuthenticated: boolean = false;
  /**
   * @constructor
   * @param {AuthService} authService - Service that handles authentication logic.
   */

  constructor(private authService: AuthService) {}
  /**
   * @method ngOnInit
   * @description Lifecycle hook that runs when the component is initialized. It updates the authentication status and
   * sets up an event listener for changes in authentication state.
   */

  ngOnInit(): void {
    console.log('Initializing AppComponent');
    this.updateAuthenticationStatus();

    window.addEventListener('userAuthenticated', () => {
      console.log('userAuthenticated event received - updating status');
      this.updateAuthenticationStatus();
    });
  }

  /**
   * @method ngOnDestroy
   * @description Lifecycle hook that runs when the component is destroyed. It removes the event listener for authentication
   * state changes to prevent memory leaks.
   */

  ngOnDestroy(): void {
    console.log('Removing event listener for userAuthenticated');
    window.removeEventListener(
      'userAuthenticated',
      this.updateAuthenticationStatus.bind(this)
    );
  }

  /**
   * @method updateAuthenticationStatus
   * @description Updates the authentication status of the user by checking with the AuthService. It updates the view accordingly.
   */

  updateAuthenticationStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log('Authentication Status updated:', this.isAuthenticated); // Log the status to verify
  }
}
