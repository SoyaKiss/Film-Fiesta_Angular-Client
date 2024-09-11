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
  constructor(private router: Router, private authService: AuthService) {}

  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  goToFavorites(): void {
    this.router.navigate(['favorites']);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
