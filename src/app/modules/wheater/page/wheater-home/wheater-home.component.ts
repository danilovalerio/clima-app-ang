import { Component } from '@angular/core';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'app-wheater-home',
  templateUrl: './wheater-home.component.html',
  styleUrl: './wheater-home.component.scss',
})
export class WheaterHomeComponent {
  constructor(private weatherService: WeatherService) {}
}
