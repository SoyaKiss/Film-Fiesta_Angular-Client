import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../app/header/header.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HeaderComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Film-Fiesta-Angular-client';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('Initializing AppComponent');
    this.updateAuthenticationStatus();

    // Listen for changes in authentication state to update the header visibility
    window.addEventListener('userAuthenticated', () => {
      console.log('userAuthenticated event received - updating status');
      this.updateAuthenticationStatus();
    });
  }

  ngOnDestroy(): void {
    // Remove the event listener to prevent memory leaks
    console.log('Removing event listener for userAuthenticated');
    window.removeEventListener(
      'userAuthenticated',
      this.updateAuthenticationStatus.bind(this)
    );
  }

  // Method to update the authentication status
  updateAuthenticationStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log('Authentication Status updated:', this.isAuthenticated); // Log the status to verify
  }
}
