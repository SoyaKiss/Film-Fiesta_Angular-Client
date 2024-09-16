/**
 * @file description-dialog.component.ts
 * @description Component for displaying the description of the movie in a dialog format. It shows the description
 * with an option to close the dialog.
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-description-dialog',
  standalone: true,
  imports: [],
  templateUrl: './description-dialog.component.html',
  styleUrl: './description-dialog.component.scss',
})
export class DescriptionDialogComponent {
  /**
   * @constructor
   * @param {Object} data - The data passed to the dialog containing description information.
   * @param {string} data.description.Name - The description of the movie.
   */
}
