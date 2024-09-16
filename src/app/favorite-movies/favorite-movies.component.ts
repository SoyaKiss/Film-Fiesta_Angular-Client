/**
 * @file favorite-movies.component.ts
 * @description Component responsible for displaying and managing a user's favorite movies. It fetches favorite
 * movie details from an API and allows users to remove movies from their favorites list.
 */

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // Ensure the service path is correct
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
// import { FavoriteMovieCardComponent } from '../favorite-movie-card/favorite-movie-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Interface for Movie objects.
 * @interface Movie
 * @property {string} _id - The unique identifier of the movie.
 * @property {string} [Title] - Optional title of the movie.
 * @property {string} [ImageURL] - Optional image URL of the movie.
 * @property {any} [key: string] - Allows for any additional properties.
 */

interface Movie {
  _id: string;
  Title?: string;
  ImageURL?: string;
  [key: string]: any;
}

@Component({
  selector: 'app-favorite-movies',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    // FavoriteMovieCardComponent,
  ],
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})
export class FavoriteMoviesComponent implements OnInit {
  /**
   * @property {Movie[]} favoriteMovies - An array of favorite movies fetched from the API.
   */

  favoriteMovies: Movie[] = [];

  /**
   * @constructor
   * @param {FetchApiDataService} fetchApiData - Service used to fetch data from the API.
   * @param {MatSnackBar} snackBar - Service used to display notifications to the user.
   */

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  /**
   * @method ngOnInit
   * @description Lifecycle hook that initializes the component. Currently, it loads favorite movies but can be
   * expanded as needed.
   */

  ngOnInit(): void {
    // this.loadFavoriteMovies();
  }
}

// Temporarily disable this until we can resolve it

// loadFavoriteMovies(): void {
//     const username = localStorage.getItem('username');
//     if (username) {
//       // Fetch the IDs of favorite movies from the backend
//       this.fetchApiData.getFavoriteMovies(username).subscribe({
//         next: (movieIds: string[]) => {
//           console.log('Fetched favorite movie IDs:', movieIds);
//           this.favoriteMovies = []; // Clear the list before populating it

//           // For each ID, fetch the full movie details
//           movieIds.forEach((id) => {
//             this.fetchApiData.getOneMovie(id).subscribe(
//               (movie: Movie) => {
//                 if (movie && movie._id) {
//                   this.favoriteMovies.push(movie); // Add complete movie data to the array
//                   console.log('Fetched full movie data:', movie);
//                 } else {
//                   console.warn('Fetched movie is incomplete:', movie);
//                 }
//               },
//               (error: any) => {
//                 console.error('Error fetching movie details:', error);
//               }
//             );
//           });
//         },
//         error: (error: any) => {
//           console.error('Error fetching favorite movies:', error);
//         },
//       });
//     }
//   }

//   // Remove a movie from the favorites list
//   removeFavorite(movieId: string): void {
//     this.favoriteMovies = this.favoriteMovies.filter(
//       (movie: Movie) => movie._id !== movieId
//     );
//     const updatedFavorites = this.favoriteMovies.map(
//       (movie: Movie) => movie._id
//     );
//     localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
//     this.snackBar.open('Removed from Favorites!', 'OK', { duration: 2000 });
//   }
// }

/**
 * Method to remove a movie from the favorites list.
 * @param {string} movieId - The ID of the movie to be removed from favorites.
 */
/*
removeFavorite(movieId: string): void {
    this.favoriteMovies = this.favoriteMovies.filter(
      (movie: Movie) => movie._id !== movieId
    );
    const updatedFavorites = this.favoriteMovies.map(
      (movie: Movie) => movie._id
    );
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    this.snackBar.open('Removed from Favorites!', 'OK', { duration: 2000 });
  }
*/
