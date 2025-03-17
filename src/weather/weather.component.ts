import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WeatherService, Location, GeocodingResult } from './weather.service';
import { HttpClientModule } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

interface TravelDates {
  startDate: string | null;
  endDate: string | null;
  avgDayTemp?: number;
  avgNightTemp?: number;
  minTemp?: number;
  maxTemp?: number;
  error?: string;
}

interface Temperature {
  max: number;
  min: number;
}

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [
    CommonModule, 
    HttpClientModule, 
    FormsModule
  ],
  providers: [WeatherService],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  locations: Location[] = [
    { name: 'New York, NY, United States', latitude: 40.7128, longitude: -74.0060 },
    { name: 'London, United Kingdom', latitude: 51.5074, longitude: -0.1278 },
    { name: 'Tokyo, Japan', latitude: 35.6762, longitude: 139.6503 }
  ];
  weatherData: any[] = [];
  loading = false;
  error = '';
  searchResults: GeocodingResult[] = [];
  searchQuery = '';
  forecastDays = 5;
  availableForecastDays = [3, 5];
  showFeelsLike = true;
  showSunTimes = true;
  cardSize: 'medium' | 'large' = 'medium';
  screenSizeWarning = '';
  travelMode = false;
  travelDates: { [key: number]: TravelDates } = {};
  private searchSubject = new Subject<string>();
  
  minDate: string;
  maxDate: string;

  isControlsExpanded = false;

  constructor(private weatherService: WeatherService) {
    this.searchSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(query => {
        if (query.length >= 3) {
          this.searchLocations(query);
        } else {
          this.searchResults = [];
        }
      });

    const today = new Date();
    const nextYear = new Date();
    nextYear.setFullYear(today.getFullYear() + 1);

    this.minDate = today.toISOString().split('T')[0];
    this.maxDate = nextYear.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.checkScreenSize();
    this.fetchWeatherData();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkScreenSize();
  }

  checkScreenSize() {
    const width = window.innerWidth;
    if (this.cardSize === 'large' && width < 900) {
      this.screenSizeWarning = 'Your screen might be too small for large cards. Consider switching to medium cards or increasing your window size.';
    } else if (this.cardSize === 'medium' && width < 700) {
      this.screenSizeWarning = 'Your screen might be too small for medium cards. Consider increasing your window size.';
    } else {
      this.screenSizeWarning = '';
    }
  }

  toggleControls() {
    this.isControlsExpanded = !this.isControlsExpanded;
  }

  setCardSize(size: 'medium' | 'large') {
    if (this.locations.length < 3) {
      alert('With fewer than 3 cities, cards will automatically display in large size for better visibility.');
      this.cardSize = 'large';
    } else {
      this.cardSize = size;
    }
    this.checkScreenSize();
  }

  get effectiveCardSize(): 'medium' | 'large' {
    return this.locations.length < 3 ? 'large' : this.cardSize;
  }

  onSearchInput(event: any) {
    this.searchQuery = event.target.value;
    this.searchSubject.next(this.searchQuery);
  }

  searchLocations(query: string) {
    this.weatherService.searchLocations(query).subscribe({
      next: (results) => {
        this.searchResults = results;
      },
      error: (error) => {
        console.error('Location search error:', error);
        this.error = error;
      }
    });
  }

  addLocationFromSearch(result: GeocodingResult) {
    const newLocation: Location = {
      name: `${result.name}${result.admin1 ? ', ' + result.admin1 : ''}, ${result.country}`,
      latitude: result.latitude,
      longitude: result.longitude
    };
    
    const newTravelDates: { [key: number]: TravelDates } = {};
    Object.keys(this.travelDates).forEach(key => {
      const numKey = parseInt(key, 10);
      newTravelDates[numKey + 1] = this.travelDates[numKey];
    });
    
    newTravelDates[0] = { startDate: null, endDate: null };
    
    this.travelDates = newTravelDates;
    this.locations.unshift(newLocation);
    this.searchQuery = '';
    this.searchResults = [];
    this.fetchWeatherData();
  }

  onForecastDaysChange() {
    this.fetchWeatherData();
  }

  fetchWeatherData() {
    this.loading = true;
    this.error = '';
    
    this.weatherService.getWeatherForLocations(this.locations, this.forecastDays).subscribe({
      next: (data) => {
        this.weatherData = data.map((weather, index) => ({
          location: this.locations[index],
          current: {
            temp: weather.current.temperature_2m,
            feelsLike: weather.current.apparent_temperature,
            description: this.getWeatherDescription(weather.current.temperature_2m)
          },
          forecast: weather.daily.time.map((date: string, i: number) => ({
            date: new Date(date),
            maxTemp: weather.daily.temperature_2m_max[i],
            minTemp: weather.daily.temperature_2m_min[i],
            precipProb: weather.daily.precipitation_probability_mean[i],
            sunrise: new Date(weather.daily.sunrise[i]),
            sunset: new Date(weather.daily.sunset[i])
          })),
          hourly: weather.hourly.time.slice(0, 24).map((time: string, i: number) => ({
            time: new Date(time),
            temp: weather.hourly.temperature_2m[i],
            feelsLike: weather.hourly.apparent_temperature[i]
          }))
        }));
        this.loading = false;
      },
      error: (errorMessage) => {
        console.error('Weather error:', errorMessage);
        this.error = errorMessage;
        this.loading = false;
      }
    });
  }

  removeLocation(index: number) {
    this.locations.splice(index, 1);
    
    const newTravelDates: { [key: number]: TravelDates } = {};
    Object.keys(this.travelDates).forEach(key => {
      const numKey = parseInt(key, 10);
      if (numKey < index) {
        newTravelDates[numKey] = this.travelDates[numKey];
      } else if (numKey > index) {
        newTravelDates[numKey - 1] = this.travelDates[numKey];
      }
    });
    
    this.travelDates = newTravelDates;
    
    if(this.locations[0]){
      this.fetchWeatherData();
    }else{
      this.weatherData = [];
    }
  }

  private getWeatherDescription(temperature: number): string {
    if (temperature > 85) return 'Hot';
    if (temperature > 65) return 'Warm';
    if (temperature > 45) return 'Mild';
    return 'Cool';
  }

  formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  }

  updateStartDate(index: number, date: string) {
    if (!this.travelDates[index]) {
      this.travelDates[index] = { startDate: null, endDate: null };
    }
    this.travelDates[index].startDate = date;
    this.fetchForecastData(index);
  }

  updateEndDate(index: number, date: string) {
    if (!this.travelDates[index]) {
      this.travelDates[index] = { startDate: null, endDate: null };
    }
    this.travelDates[index].endDate = date;
    this.fetchForecastData(index);
  }

  getDateRange(index: number): TravelDates {
    return this.travelDates[index] || { startDate: null, endDate: null };
  }

  private fetchForecastData(index: number) {
    const dates = this.travelDates[index];
    if (!dates?.startDate || !dates?.endDate) {
      return;
    }

    this.weatherService.getWeatherForLocation(
      this.locations[index],
      16
    ).subscribe({
      next: (data) => {
        const startIndex = data.daily.time.findIndex((date: string) => date >= dates.startDate!);
        const endIndex = data.daily.time.findIndex((date: string) => date > dates.endDate!) - 1;
        
        if (startIndex === -1 || endIndex === -1 || startIndex > endIndex) {
          this.travelDates[index] = {
            ...dates,
            error: 'No weather data available for the selected dates',
            avgDayTemp: undefined,
            avgNightTemp: undefined,
            minTemp: undefined,
            maxTemp: undefined
          };
          return;
        }

        const selectedTemps = data.daily.temperature_2m_max
          .slice(startIndex, endIndex + 1)
          .map((max: number, i: number) => ({
            max,
            min: data.daily.temperature_2m_min[startIndex + i]
          }));

        if (selectedTemps.length === 0) {
          this.travelDates[index] = {
            ...dates,
            error: 'No temperature data available',
            avgDayTemp: undefined,
            avgNightTemp: undefined,
            minTemp: undefined,
            maxTemp: undefined
          };
          return;
        }

        const validTemps = selectedTemps.filter((t: Temperature) => 
          !isNaN(t.max) && isFinite(t.max) && 
          !isNaN(t.min) && isFinite(t.min)
        );

        if (validTemps.length === 0) {
          this.travelDates[index] = {
            ...dates,
            error: 'Invalid temperature data',
            avgDayTemp: undefined,
            avgNightTemp: undefined,
            minTemp: undefined,
            maxTemp: undefined
          };
          return;
        }

        const minTemp = Math.min(...validTemps.map((t: Temperature) => t.min));
        const maxTemp = Math.max(...validTemps.map((t: Temperature) => t.max));
        const avgDayTemp = validTemps.reduce((sum: number, t: Temperature) => sum + t.max, 0) / validTemps.length;
        const avgNightTemp = validTemps.reduce((sum: number, t: Temperature) => sum + t.min, 0) / validTemps.length;

        this.travelDates[index] = {
          ...dates,
          avgDayTemp,
          avgNightTemp,
          minTemp,
          maxTemp,
          error: undefined
        };
      },
      error: (error) => {
        console.error('Forecast error:', error);
        this.travelDates[index] = {
          ...dates,
          error: 'Failed to fetch forecast data',
          avgDayTemp: undefined,
          avgNightTemp: undefined,
          minTemp: undefined,
          maxTemp: undefined
        };
      }
    });
  }
}