import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Location {
  name: string;
  latitude: number;
  longitude: number;
}

export interface GeocodingResult {
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

@Injectable()
export class WeatherService {
  private baseUrl = 'https://api.open-meteo.com/v1/forecast';
  private geocodingUrl = 'https://geocoding-api.open-meteo.com/v1/search';

  constructor(private http: HttpClient) {}

  searchLocations(query: string): Observable<GeocodingResult[]> {
    const url = `${this.geocodingUrl}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`;
    
    return this.http.get<any>(url).pipe(
      map(response => response.results || []),
      catchError(this.handleError)
    );
  }

  getWeatherForLocation(location: Location, forecastDays: number): Observable<any> {
    const url = `${this.baseUrl}?latitude=${location.latitude}&longitude=${location.longitude}`
      + `&current=temperature_2m,relative_humidity_2m,wind_speed_10m,apparent_temperature,uv_index,visibility`
      + `&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_mean,sunrise,sunset,uv_index_max`
      + `&hourly=temperature_2m,apparent_temperature`
      + `&temperature_unit=fahrenheit&timezone=auto&forecast_days=${forecastDays}`;
    
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  getWeatherForLocations(locations: Location[], forecastDays: number): Observable<any[]> {
    const requests = locations.map(location => this.getWeatherForLocation(location, forecastDays));
    return forkJoin(requests);
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred while fetching data';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      if (error.status === 404) {
        errorMessage = 'Data not found';
      } else if (error.status === 429) {
        errorMessage = 'Too many requests, please try again later';
      } else if (error.status === 400) {
        // Try to extract error message from the response if available
        const response = error.error;
        if (response?.reason) {
          errorMessage = response.reason;
        }
      }
    }
    
    return throwError(() => errorMessage);
  }
}