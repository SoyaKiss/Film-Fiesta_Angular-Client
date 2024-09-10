import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from './user-registration-form/user-registration-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, // Marks AppComponent as a standalone component
  imports: [CommonModule, UserRegistrationFormComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Film-Fiesta-Angular-client';

  constructor(public dialog: MatDialog) {} // Correctly inject MatDialog service

  // This function will open the dialog when the signup button is clicked
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      // Set the width of the dialog
      width: '280px',
    });
  }
}
