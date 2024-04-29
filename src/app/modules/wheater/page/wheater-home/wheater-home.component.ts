import { Component, OnDestroy, OnInit } from '@angular/core';
import { WeatherService } from '../../services/weather.service';
import { response } from 'express';
import { error } from 'console';
import { IWeatherDatas } from '../../../../models/interfaces/weather-datas.interface';
import { Subject, takeUntil } from 'rxjs';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-wheater-home',
  templateUrl: './wheater-home.component.html',
  styleUrl: './wheater-home.component.scss',
})
export class WheaterHomeComponent implements OnInit, OnDestroy {
  //Quando referenciar observable usar $ no final (destroy$)
  private readonly destroy$: Subject<void> = new Subject();
  initialCityName = 'São Paulo';
  weatherDatas!: IWeatherDatas;
  searchIcon = faMagnifyingGlass;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.getWeatherDatas(this.initialCityName);
  }

  getWeatherDatas(cityName: string): void {
    this.weatherService
      .getWeatherDatas(cityName)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log(response);
          response && (this.weatherDatas = response);
          console.log(this.weatherDatas.main);
        },
        error: (error) => console.log(error),
      });
  }

  onSubmit(): void {
    this.getWeatherDatas(this.initialCityName);
    this.initialCityName = '';
  }

  ngOnDestroy(): void {
    // ao sair da tela dará um unsubscribe para não ficar escutando esse obsevable
    this.destroy$.next();
    this.destroy$.complete();
  }
}
