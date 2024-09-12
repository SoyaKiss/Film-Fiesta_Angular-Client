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

  constructor(
    public fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.loadFavoriteMovies(); // Load favorite movies on initialization
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

  // Load favorite movies from local storage
  loadFavoriteMovies(): void {
    const savedFavorites = localStorage.getItem('favoriteMovies');
    if (savedFavorites) {
      this.favoriteMovies = new Set(JSON.parse(savedFavorites));
    }
  }

  // Toggle favorite status of a movie
  toggleFavorite(movie: any): void {
    if (this.favoriteMovies.has(movie._id)) {
      // Remove from favorites
      this.favoriteMovies.delete(movie._id);
      this.snackBar.open('Removed from Favorites!', 'OK', { duration: 2000 });
    } else {
      // Add to favorites
      this.favoriteMovies.add(movie._id);
      this.snackBar.open('Added to Favorites!', 'OK', { duration: 2000 });
    }
    this.saveFavoriteMovies();
  }

  // Check if movie is a favorite
  isFavorite(movie: any): boolean {
    return this.favoriteMovies.has(movie._id);
  }

  // Save favorite movies to local storage
  saveFavoriteMovies(): void {
    localStorage.setItem(
      'favoriteMovies',
      JSON.stringify(Array.from(this.favoriteMovies))
    );
  }

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
