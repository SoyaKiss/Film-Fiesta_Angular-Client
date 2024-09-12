import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent }, // Default route to Welcome Page
  { path: 'login', component: LoginComponent }, // Route to Login Page
  { path: 'movies', component: MovieCardComponent }, // Route to Movies Page
  { path: 'profile', component: ProfileComponent }, // Route to Profile Page
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Ensure RouterModule is correctly imported
  exports: [RouterModule], // Export RouterModule to make it available throughout the app
})
export class AppRoutingModule {}
