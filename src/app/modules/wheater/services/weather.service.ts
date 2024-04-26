import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_KEY } from '../../../../constants_config';

@Injectable({
  providedIn: 'root', //permite uso dela de forma global não somente a um modulo específico
})
export class WeatherService {
  private apiKey = API_KEY;

  constructor(private http: HttpClient) {}

  getWeatherDatas(cityName: string): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&node=json&appid=${this.apiKey}`,
      {}
    );
  }
}
