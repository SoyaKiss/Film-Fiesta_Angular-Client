/**
 * @file actor-dialog.component.ts
 * @description Component for displaying actor information in a dialog format. It shows the actors's name and birthday,
 * with an option to close the dialog.
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-actor-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatButton], // Add the required imports here
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
  /**
   * @constructor
   * @param {Object} data - The data passed to the dialog containing actor information.
   * @param {string} data.actor.Name - The name of the actor.
   * @param {string} data.actor.Birthday - The birthday of the actor.
   */

  constructor(@Inject(MAT_DIALOG_DATA) public data: { actor: any }) {}

  formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }
}
