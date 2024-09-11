// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedIn = false;

  constructor() {
    // On initialization, synchronize the in-memory state with local storage
    this.isLoggedIn = this.checkLocalStorage();
  }

  // Synchronize in-memory state with local storage
  private checkLocalStorage(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  // Method to log in the user
  login(): void {
    this.isLoggedIn = true;
    localStorage.setItem('isLoggedIn', 'true');
  }

  // Method to log out the user
  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token'); // Remove the token if stored
    localStorage.removeItem('username'); // Remove the username if stored
  }

  // Method to check if the user is logged in
  isAuthenticated(): boolean {
    // Check both the in-memory state and synchronize with local storage state
    this.isLoggedIn = this.checkLocalStorage();
    return this.isLoggedIn;
  }
}
