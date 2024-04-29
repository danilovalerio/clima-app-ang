import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { response } from 'express';
import { error } from 'console';
import { IWeatherDatas } from '../../../../models/interfaces/weather-datas.interface';

@Component({
  selector: 'app-wheater-home',
  templateUrl: './wheater-home.component.html',
  styleUrl: './wheater-home.component.scss',
})
export class WheaterHomeComponent implements OnInit {
  initialCityName = 'São Paulo';
  weatherDatas!: IWeatherDatas;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.weatherService.getWeatherDatas(cityName).subscribe({
      next: (response) => {
        console.log(response);
        response && (this.weatherDatas = response);
        console.log(this.weatherDatas.main);
      },
      error: (error) => console.log(error),
    });
  }
}
