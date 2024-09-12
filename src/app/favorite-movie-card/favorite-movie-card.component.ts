import { Component, Input } from '@angular/core';
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
export class FavoriteMovieCardComponent {
  @Input() movie: any; // Movie data will be passed in as an input

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  removeFromFavorites(movieId: string): void {
    const username = localStorage.getItem('username') || '';

    if (username) {
      this.fetchApiData.deleteFavoriteMovie(username, movieId).subscribe(
        () => {
          this.snackBar.open('Removed from favorites!', 'OK', {
            duration: 3000,
          });
          // Optionally, reload the favorite movies list from local storage or re-fetch from API
        },
        (error) => {
          console.error('Error removing favorite:', error);
          this.snackBar.open('Failed to remove from favorites.', 'OK', {
            duration: 3000,
          });
        }
      );
    } else {
      console.error(
        'Error: Username not found, ensure the user is logged in properly.'
      );
    }
  }
}
