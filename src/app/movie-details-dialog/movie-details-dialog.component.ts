import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-movie-details-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule], // Import necessary Material modules
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: { movie: any }) {}
}
