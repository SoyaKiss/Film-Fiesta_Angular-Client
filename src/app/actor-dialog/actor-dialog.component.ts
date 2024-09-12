import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { onErrorResumeNextWith } from 'rxjs';

@Component({
  selector: 'app-actor-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule], // Add the required imports here
  template: `
    <h2 mat-dialog-title>{{ data.actor.Name }}</h2>
    <mat-dialog-content>
      <!-- Format the birth-date to a more readable format -->
      <p><strong>Birthday:</strong> {{ formatDate(data.actor.Birthday) }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
})
export class ActorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { actor: any }) {}

  // Function to format the date into a more readable format (e.g., April 4, 1965)
  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
}
