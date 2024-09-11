import { Component, OnInit } from '@angular/core';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome-page',
  standalone: true,
  imports: [],
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss',
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {}

  openUserRegistrationDialog(): void {
    const dialogRef = this.dialog.open(UserRegistrationFormComponent, {
      width: '280px',
    });

    dialogRef.afterClosed().subscribe(() => {
      // Add any specific actions after the dialog closes if needed
    });
  }

  openUserLoginDialog(): void {
    const dialogRef = this.dialog.open(UserLoginFormComponent, {
      width: '280px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        // Navigate to movies route upon successful login
        this.router.navigate(['movies']);
      }
    });
  }

  openMovies(): void {
    this.router.navigate(['movies']);
  }
}
