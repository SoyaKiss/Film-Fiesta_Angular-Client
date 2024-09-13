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
  @Input() movie: any; // Movie data will be passed in as an input
  @Output() remove = new EventEmitter<string>(); // EventEmitter to handle removal

  constructor(
    private snackBar: MatSnackBar,
    private fetchApiData: FetchApiDataService // Inject FetchApiDataService
  ) {}

  ngOnInit(): void {
    this.checkMovieData();
  }

  // Method to check the movie data validity
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

  // Fetch complete movie details if data is missing
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

  removeFromFavorites(movieId: string): void {
    if (!movieId) {
      this.snackBar.open('Error: Invalid movie ID.', 'OK', { duration: 3000 });
      return;
    }

    this.remove.emit(movieId); // Emit the movie ID to the parent component for removal
    this.snackBar.open('Removed from favorites!', 'OK', { duration: 3000 });
  }
}
