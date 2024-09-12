import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-genre-dialog',
  standalone: true,
  imports: [MatDialogModule, CommonModule], // Required imports
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
  constructor(@Inject(MAT_DIALOG_DATA) public data: { genre: any }) {}
}
