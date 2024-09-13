import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
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

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    if (!this.movie) {
      console.warn('Received undefined movie:', this.movie);
    } else {
      console.log('Movie data received:', this.movie);
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
