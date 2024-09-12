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
    this.notifyAuthenticationChange(); // Notify that the user is now authenticated
  }

  // Method to log out the user
  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('token'); // Remove the token if stored
    localStorage.removeItem('username'); // Remove the username if stored
    this.notifyAuthenticationChange(); // Notify that the user is now logged out
  }

  // Method to check if the user is logged in
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const isLoggedIn = !!token;
    console.log('Checking authentication:', isLoggedIn, 'Token:', token); // Debugging log
    return isLoggedIn;
  }

  // Method to notify other components when the authentication state changes
  notifyAuthenticationChange(): void {
    window.dispatchEvent(new Event('userAuthenticated')); // Dispatch custom event to signal authentication change
  }
}
