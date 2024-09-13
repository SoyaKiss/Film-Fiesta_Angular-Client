import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
export class FavoriteMovieCardComponent implements OnChanges {
  @Input() movie: any; // Movie data will be passed in as an input
  @Output() remove = new EventEmitter<string>(); // EventEmitter to handle removal

  constructor(private snackBar: MatSnackBar) {}

  ngOnChanges(changes: SimpleChanges): void {
    // Handle movie data changes to ensure it's valid before rendering
    if (changes['movie'] && changes['movie'].currentValue) {
      this.validateMovieData(changes['movie'].currentValue);
    }
  }

  // Method to validate the movie data
  private validateMovieData(movie: any): void {
    if (!movie || !movie._id) {
      console.warn('Received undefined or invalid movie:', movie);
      this.snackBar.open('Error: Invalid movie data received.', 'OK', {
        duration: 3000,
      });
      // Set a default fallback if the data is invalid
      this.movie = {
        _id: '',
        Title: 'No Title Available',
        ImageURL: 'https://via.placeholder.com/150',
      };
    } else {
      console.log('Movie data received:', movie);
    }
  }

  removeFromFavorites(movieId: string): void {
    if (!movieId) {
      this.snackBar.open('Error: Invalid movie ID.', 'OK', { duration: 3000 });
      return;
    }

    this.remove.emit(movieId); // Emit the movie ID to the parent component
    this.snackBar.open('Removed from favorites!', 'OK', { duration: 3000 });
  }
}
