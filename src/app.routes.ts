import { Routes } from '@angular/router';
import { WeatherComponent } from './weather/weather.component';
import { WeatherInfoComponent } from './weather-info/weather-info.component';

const routes: Routes = [
  { path: 'weather', component: WeatherComponent },
  { path: 'info', component: WeatherInfoComponent },
  { path: '', redirectTo: '/weather', pathMatch: 'full' }
];

export default routes;