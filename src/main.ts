import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

bootstrapApplication(AppComponent, {
  ...appConfig, // Spread the existing appConfig
  providers: [
    ...appConfig.providers, // Merge existing providers from appConfig
    provideHttpClient(),
    provideAnimations(), // Required for Toastr
    importProvidersFrom(ToastrModule.forRoot()) // Provide Toastr globally
  ],
}).catch(err => console.error(err));
