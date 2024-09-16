/**
 * @file genre-dialog.component.ts
 * @description Component for displaying genre information in a dialog format. It shows the genre's name and
 * description, with an option to close the dialog.
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule, MatButtonModule], // Required imports
  template: `
    <h2 mat-dialog-title>{{ data.genre.Name }}</h2>
    <mat-dialog-content>
      <p><strong>Description:</strong> {{ data.genre.Description }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
})
export class GenreDialogComponent {
  /**
   * @constructor
   * @param {Object} data - The data passed to the dialog containing genre information.
   * @param {string} data.genre.Name - The name of the genre.
   * @param {string} data.genre.Description - A brief description of the genre.
   */

  constructor(@Inject(MAT_DIALOG_DATA) public data: { genre: any }) {}
}
