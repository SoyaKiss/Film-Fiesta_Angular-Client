import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [MatCardModule, MatDialogModule, CommonModule],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar // Inject MatSnackBar to show error messages
  ) {}

  // Lifecycle hook - called when Angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    const token = localStorage.getItem('token');
    // console.log('Token being used:', token); // Log the token value to ensure it's being retrieved correctly
    if (!token) {
      this.snackBar.open('Token is missing. Please log in.', 'OK', {
        duration: 3000,
      });
      return; // Stop further execution if token is missing
    }

    this.fetchApiData.getAllMovies().subscribe(
      (resp: any) => {
        this.movies = resp;
        console.log('Movies fetched successfully:', this.movies);
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
}
