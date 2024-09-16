/**
 * @file movie-details-dialog.component.ts
 * @description Component responsible for displaying movie details in a dialog. It uses Angular Material Dialog
 * to show the movie title and description in a modal format.
 */

import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h2 mat-dialog-title>{{ data.movie.Title }}</h2>
    <mat-dialog-content>
      <p>{{ data.movie.Description }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Close</button>
    </mat-dialog-actions>
  `,
})
export class MovieDetailsDialogComponent {
  /**
   * @constructor
   * @param {object} data - Injected data containing the movie details.
   * @param {any} data.movie - The movie object containing details such as the title and description.
   */

  constructor(@Inject(MAT_DIALOG_DATA) public data: { movie: any }) {}
}
