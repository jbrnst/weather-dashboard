import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import routes from './app.routes';
import { provideRouter } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(MainLayoutComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient()
  ]
}).catch(err => console.error(err));