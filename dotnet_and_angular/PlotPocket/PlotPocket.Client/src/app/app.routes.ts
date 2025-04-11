import { Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TrendingComponent } from './components/trending/trending.component';
import { TvshowsComponent } from './components/tvshows/tvshows.component';
import { MoviesComponent } from './components/movies/movies.component';
import { ShowsComponent } from './components/shows/shows.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'auth/register', component: RegisterComponent },
  { path: 'auth/login', component: LoginComponent },
  { path: 'media/trending', component: TrendingComponent },
  { path: 'media/tv-shows', component: TvshowsComponent },
  { path: 'media/movies', component: MoviesComponent },
  { path: 'media/shows', component: ShowsComponent },
  { path: '**', component: PageNotFoundComponent },
];
