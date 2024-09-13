import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ActorDialogComponent } from '../actor-dialog/actor-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { MovieDetailsDialogComponent } from '../movie-details-dialog/movie-details-dialog.component';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MatCardModule, MatDialogModule, CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: Set<string> = new Set(); // Set to track favorite movies
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUser();
    this.getMovies();
    this.loadFavoriteMovies(); // Ensure this method is correctly defined
  }

  loadUser(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  getMovies(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.snackBar.open('Token is missing. Please log in.', 'OK', {
        duration: 3000,
      });
      return;
    }

    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
      },
      (error) => {
        if (error.status === 401) {
          this.snackBar.open(
            'Unauthorized access. Please log in again.',
            'OK',
            {
              duration: 3000,
            }
          );
        } else {
          this.snackBar.open(
            'Error fetching movies. Please try again later.',
            'OK',
            {
              duration: 3000,
            }
          );
        }
        console.error('Error fetching movies:', error);
      }
    );
  }

  // Ensure this method is properly defined
  loadFavoriteMovies(): void {
    const savedFavorites = localStorage.getItem('favoriteMovies');
    if (savedFavorites) {
      this.favoriteMovies = new Set(JSON.parse(savedFavorites));
    }
  }

  toggleFavorite(movie: any): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const username = this.user.Username || localStorage.getItem('username');

    if (this.isFavorite(movie)) {
      // Remove from favorites
      this.fetchApiData.deleteFavoriteMovie(username, movie._id).subscribe({
        next: (response) => {
          this.favoriteMovies.delete(movie._id);
          this.snackBar.open('Removed from Favorites!', 'OK', {
            duration: 2000,
          });
          this.saveFavoriteMovies();
        },
        error: (error) => {
          console.log('Error removing from favorites:', error);
        },
      });
    } else {
      // Add to favorites
      this.fetchApiData.addFavoriteMovie(username, movie._id).subscribe({
        next: (response) => {
          this.favoriteMovies.add(movie._id);
          this.snackBar.open('Added to Favorites!', 'OK', { duration: 2000 });
          this.saveFavoriteMovies();
        },
        error: (error) => {
          console.log('Error adding to favorites:', error);
        },
      });
    }
  }

  isFavorite(movie: any): boolean {
    return this.favoriteMovies.has(movie._id);
  }

  saveFavoriteMovies(): void {
    localStorage.setItem(
      'favoriteMovies',
      JSON.stringify(Array.from(this.favoriteMovies))
    );
  }

  // All dialogs below:

  // Open Main Actor Dialog
  openActorDialog(actor: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(ActorDialogComponent, {
      data: { actor },
      width: '400px',
    });
  }

  // Open Supporting Actor Dialog
  openSupportingActorDialog(actor: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(ActorDialogComponent, {
      data: { actor },
      width: '400px',
    });
  }

  // Open Genre Dialog
  openGenreDialog(genre: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(GenreDialogComponent, {
      data: { genre },
      width: '400px',
    });
  }

  // Open Description Dialog
  openDescriptionDialog(movie: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(MovieDetailsDialogComponent, {
      data: { movie },
      width: '400px',
    });
  }
}
