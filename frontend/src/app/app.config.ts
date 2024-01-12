import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'feed-88b7e',
          appId: '1:881002275292:web:7a3c8398c4f8f987e2af19',
          storageBucket: 'feed-88b7e.appspot.com',
          apiKey: 'AIzaSyA3uBzeQyPXgHXEqwViKdWIIiBnBE_WdhE',
          authDomain: 'feed-88b7e.firebaseapp.com',
          messagingSenderId: '881002275292',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
  ],
};
