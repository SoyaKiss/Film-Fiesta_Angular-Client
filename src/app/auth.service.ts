import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // This makes the service available throughout the app without needing to import it in the module
})
export class AuthService {
  private isLoggedIn = false; // State to track login status

  constructor() {}

  // Method to log in the user
  login(): void {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true'); // Save the login state in local storage
  }

  // Method to log out the user
  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn'); // Clear the login state from local storage
  }

  // Method to check if the user is logged in
  isAuthenticated(): boolean {
    // Check the in-memory state or fallback to local storage state
    return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  }
}
