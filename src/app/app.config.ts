/**
 * @file app.config.ts
 * @description This file configures the Angular application, setting up routing and change detection strategies.
 * It provides essential providers that enhance performance and manage navigation within the app.
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/**
 * @constant {ApplicationConfig} appConfig
 * @description Configuration object for the Angular application.
 * It includes providers for routing and zone change detection to enhance performance.
 */

export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Sets up zone change detection with event coalescing enabled.
     * Event coalescing helps improve performance by reducing the number of change detection cycles.
     * @param {boolean} eventCoalescing - When set to true, combines multiple events into a single change detection run.
     */

    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Configures the router with the defined application routes.
     * @param {Array} routes - Array of route configurations imported from app.routes.
     */

    provideRouter(routes),
  ],
};
