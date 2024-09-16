/**
 * @file app-routing.module.ts
 * @description Configures the routing for the Angular application. This module defines the navigation paths
 * and links components to their respective routes, enabling navigation throughout the app.
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
// import { FavoriteMovieCardComponent } from './favorite-movie-card/favorite-movie-card.component';

/**
 * @constant {Routes} routes
 * @description Array of route configurations for the application. Each route links a URL path to a component.
 */

const routes: Routes = [
  { path: '', component: WelcomePageComponent }, // Default route to Welcome Page
  { path: 'login', component: LoginComponent }, // Route to Login Page
  { path: 'movies', component: MovieCardComponent }, // Route to Movies Page
  { path: 'profile', component: ProfileComponent }, // Route to Profile Page
  // { path: 'favorites', component: FavoriteMovieCardComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

/**
 * @module AppRoutingModule
 * @description The routing module that imports RouterModule with the defined routes and exports it for use throughout the application.
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)], // Ensure RouterModule is correctly imported
  exports: [RouterModule], // Export RouterModule to make it available throughout the app
})
export class AppRoutingModule {}
