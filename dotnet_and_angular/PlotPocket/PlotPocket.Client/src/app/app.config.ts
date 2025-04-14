import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
<<<<<<< HEAD
import { provideHttpClient } from '@angular/common/http';
import { TrendingService } from './services/trending.service';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    TrendingService,  // Add TrendingService here to provide it globally
  ],
=======

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient()],
>>>>>>> f6772b669156dbd79d36cc6622c6623a3ca220b6
};
