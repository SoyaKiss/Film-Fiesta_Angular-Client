import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'; // Ensure the service path is correct
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FavoriteMovieCardComponent } from '../favorite-movie-card/favorite-movie-card.component';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    FavoriteMovieCardComponent,
  ],
  templateUrl: './favorite-movies.component.html',
  styleUrls: ['./favorite-movies.component.scss'],
})
export class FavoriteMoviesComponent implements OnInit {
  favoriteMovies: Movie[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFavoriteMovies();
  }

  loadFavoriteMovies(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.fetchApiData.getFavoriteMovies(username).subscribe({
        next: (movies: any[]) => {
          console.log('Fetched favorite movies:', movies);
          // Ensure each movie has required properties; map and fetch details if necessary
          this.favoriteMovies = movies.map((movie) => ({
            _id: movie._id,
            Title: movie.Title || 'No Title Available',
            ImageURL: movie.ImageURL || 'https://via.placeholder.com/150', // Placeholder image if missing
          }));
        },
        error: (error: any) => {
          console.error('Error fetching favorite movies:', error);
        },
        complete: () => {
          console.log('Fetching favorite movies completed.');
        },
      });
    }
  }

  // Fetch details of each movie by its ID
  fetchMovieDetails(ids: string[]): void {
    ids.forEach((id: string) => {
      this.fetchApiData.getOneMovie(id).subscribe(
        (movie: Movie) => {
          if (movie && movie._id) {
            this.favoriteMovies.push(movie);
            console.log('Fetched complete movie:', movie);
          } else {
            console.warn('Fetched movie is incomplete:', movie);
          }
        },
        (error: any) => {
          console.error('Error fetching movie details:', error);
        }
      );
    });
  }

  // Remove a movie from the favorites list
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
}
