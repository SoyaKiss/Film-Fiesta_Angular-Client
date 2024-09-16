/**
 * @file favorite-movie-card.component.ts
 * @description Component for displaying a favorite movie card with options to view complete movie details and
 * remove the movie from the favorites list.
 */

import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-favorite-movie-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule],
  templateUrl: './favorite-movie-card.component.html',
  styleUrls: ['./favorite-movie-card.component.scss'],
})
export class FavoriteMovieCardComponent implements OnInit {
  /**
   * @property {any} movie - The movie data passed as an input. Expected to contain properties like _id, Title,
   * and ImageURL.
   */

  @Input() movie: any; // Movie data will be passed in as an input

  /**
   * @property {EventEmitter<string>} remove - Event emitter that sends the movie ID when a movie is removed from
   * the favorites list.
   */
  @Output() remove = new EventEmitter<string>(); // EventEmitter to handle removal

  /**
   * @constructor
   * @param {MatSnackBar} snackBar - Angular Material Snackbar service for displaying notifications.
   * @param {FetchApiDataService} fetchApiData - Service for fetching movie data from the backend.
   */
  constructor(
    private snackBar: MatSnackBar,
    private fetchApiData: FetchApiDataService // Inject FetchApiDataService
  ) {}

  /**
   * @method ngOnInit
   * @description Lifecycle hook that runs after the component is initialized. Calls method to validate the movie
   * data.
   */
  ngOnInit(): void {
    this.checkMovieData();
  }

  /**
   * @method checkMovieData
   * @description Checks if the movie data is valid. If the data is incomplete, it attempts to fetch missing movie
   * details from the backend.
   */

  checkMovieData(): void {
    if (!this.movie || !this.movie._id) {
      console.warn('Received undefined or incomplete movie data:', this.movie);
      this.snackBar.open('Error: Invalid movie data received.', 'OK', {
        duration: 3000,
      });
    } else if (!this.movie.Title || !this.movie.ImageURL) {
      // If movie data is incomplete, fetch full details from the backend
      this.fetchMissingMovieData(this.movie._id);
    } else {
      console.log('Complete movie data received:', this.movie);
    }
  }

  /**
   * @method fetchMissingMovieData
   * @description Fetches complete movie details if the provided data is incomplete.
   * @param {string} movieId - The ID of the movie to fetch details for.
   */

  fetchMissingMovieData(movieId: string): void {
    this.fetchApiData.getOneMovie(movieId).subscribe(
      (fullMovie: any) => {
        if (fullMovie && fullMovie._id) {
          this.movie = fullMovie; // Update the movie data with complete details
          console.log('Fetched missing movie data:', fullMovie);
        } else {
          console.warn('Could not fetch full movie data:', fullMovie);
          this.snackBar.open(
            'Error: Could not retrieve full movie details.',
            'OK',
            {
              duration: 3000,
            }
          );
        }
      },
      (error: any) => {
        console.error('Error fetching movie details:', error);
        this.snackBar.open('Error: Failed to fetch movie details.', 'OK', {
          duration: 3000,
        });
      }
    );
  }

  /**
   * @method removeFromFavorites
   * @description Emits the movie ID to the parent component to remove the movie from the favorites list.
   * @param {string} movieId - The ID of the movie to be removed.
   */

  removeFromFavorites(movieId: string): void {
    if (!movieId) {
      this.snackBar.open('Error: Invalid movie ID.', 'OK', { duration: 3000 });
      return;
    }

    this.remove.emit(movieId); // Emit the movie ID to the parent component for removal
    this.snackBar.open('Removed from favorites!', 'OK', { duration: 3000 });
  }
}
