import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { MovieCardComponent } from './movie-card/movie-card.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent }, // Default route to Welcome Page
  { path: 'movies', component: MovieCardComponent }, // Route to Movies Page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Ensure RouterModule is correctly imported
  exports: [RouterModule], // Export RouterModule to make it available throughout the app
})
export class AppRoutingModule {}
