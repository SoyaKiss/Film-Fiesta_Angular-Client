/**
 * @file Provides authentication services including login, logout, and authentication state management.
 * This service is responsible for managing the user's authentication state and synchronizing it with local storage.
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  /**
   * Initializes the AuthService and synchronizes the in-memory state with local storage.
   */

  constructor() {
    this.isLoggedIn = this.checkLocalStorage();
  }

  /**
   * Checks the local storage to determine if the user is logged in.
   * @returns {boolean} True if the user is logged in based on local storage, otherwise false.
   */

  private checkLocalStorage(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  /**
   * Logs in the user by setting the in-memory state and updating local storage.
   * Dispatches an event to notify other components that the user is now authenticated.
   * @returns {void}
   */

  login(): void {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
    this.notifyAuthenticationChange();
  }

  /**
   * Logs out the user by clearing the in-memory state and removing relevant items from local storage.
   * Dispatches an event to notify other components that the user is now logged out.
   * @returns {void}
   */

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.notifyAuthenticationChange();
  }

  /**
   * Checks if the user is authenticated by verifying the presence of a token in local storage.
   * Logs the authentication status for debugging purposes.
   * @returns {boolean} True if the user is authenticated, otherwise false.
   */

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    console.log('Checking authentication:', isLoggedIn, 'Token:', token);
    return isLoggedIn;
  }

  /**
   * Notifies other components when the authentication state changes by dispatching a custom event.
   * This can be used to update UI elements or trigger other actions based on the user's authentication status.
   * @returns {void}
   */

  notifyAuthenticationChange(): void {
    window.dispatchEvent(new Event('userAuthenticated'));
  }
}
