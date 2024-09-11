import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'Film-Fiesta-Angular-client';
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  // Check authentication state on component initialization
  ngOnInit(): void {
    this.updateAuthenticationStatus();
  }

  // Method to update the authentication status
  updateAuthenticationStatus(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    console.log('Authentication Status:', this.isAuthenticated); // Log the status to verify
  }
}
