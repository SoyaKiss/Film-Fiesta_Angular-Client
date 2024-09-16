/**
 * @file movie-card.component.ts
 * @description Component responsible for displaying movie cards, managing favorite movies, and providing dialog interactions
 * for actors, genres, and movie details using Angular Material.
 */

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
  /**
   * @property {any[]} movies - Array to store movie data fetched from the API.
   * @property {Set<string>} favoriteMovies - Set to track the user's favorite movies by their IDs.
   * @property {any} user - Object to hold the user's data, including username and other details.
   */

  movies: any[] = [];
  favoriteMovies: Set<string> = new Set(); // Set to track favorite movies
  user: any = {};

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service to handle API requests related to movies and user data.
   * @param {MatSnackBar} snackBar - Service to display notifications.
   * @param {MatDialog} dialog - Service to open dialogs for actors, genres, and movie details.
   */

  constructor(
    public fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  /**
   * @method ngOnInit
   * @description Lifecycle hook that runs when the component is initialized. Loads user data, fetches movies,
   * and loads favorite movies from local storage.
   */

  ngOnInit(): void {
    this.loadUser();
    this.getMovies();
    this.loadFavoriteMovies();
  }

  /**
   * @method loadUser
   * @description Loads the user data from local storage and assigns it to the user property.
   */

  loadUser(): void {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  /**
   * @method getMovies
   * @description Fetches the list of movies from the API. If the user is not authenticated, it shows an error message.
   */

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

  /**
   * @method loadFavoriteMovies
   * @description Loads the user's favorite movies from local storage and updates the favoriteMovies Set.
   */

  loadFavoriteMovies(): void {
    const savedFavorites = localStorage.getItem('favoriteMovies');
    if (savedFavorites) {
      this.favoriteMovies = new Set(JSON.parse(savedFavorites));
    }
  }

  /**
   * @method toggleFavorite
   * @description Adds or removes a movie from the user's favorites. If the movie is already a favorite, it removes it;
   * otherwise, it adds it to the favorites.
   * @param {any} movie - The movie object to be toggled as a favorite.
   */

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

  /**
   * @method isFavorite
   * @description Checks if a movie is marked as a favorite.
   * @param {any} movie - The movie object to check.
   * @returns {boolean} - Returns true if the movie is a favorite, otherwise false.
   */

  isFavorite(movie: any): boolean {
    return this.favoriteMovies.has(movie._id);
  }

  /**
   * @method saveFavoriteMovies
   * @description Saves the favorite movies to local storage.
   */

  saveFavoriteMovies(): void {
    localStorage.setItem(
      'favoriteMovies',
      JSON.stringify(Array.from(this.favoriteMovies))
    );
  }

  // All dialogs below:

  /**
   * @method openActorDialog
   * @description Opens a dialog to display details of the main actor.
   * @param {any} actor - The actor object containing actor details.
   * @param {Event} event - The event object to prevent default behavior.
   */

  openActorDialog(actor: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(ActorDialogComponent, {
      data: { actor },
      width: '400px',
    });
  }

  /**
   * @method openSupportingActorDialog
   * @description Opens a dialog to display details of the supporting actor.
   * @param {any} actor - The actor object containing actor details.
   * @param {Event} event - The event object to prevent default behavior.
   */

  openSupportingActorDialog(actor: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(ActorDialogComponent, {
      data: { actor },
      width: '400px',
    });
  }

  /**
   * @method openGenreDialog
   * @description Opens a dialog to display details of the movie's genre.
   * @param {any} genre - The genre object containing genre details.
   * @param {Event} event - The event object to prevent default behavior.
   */

  openGenreDialog(genre: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(GenreDialogComponent, {
      data: { genre },
      width: '400px',
    });
  }

  /**
   * @method openDescriptionDialog
   * @description Opens a dialog to display the description of the movie.
   * @param {any} movie - The movie object containing the description.
   * @param {Event} event - The event object to prevent default behavior.
   */

  openDescriptionDialog(movie: any, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.dialog.open(MovieDetailsDialogComponent, {
      data: { movie },
      width: '400px',
    });
  }
}
