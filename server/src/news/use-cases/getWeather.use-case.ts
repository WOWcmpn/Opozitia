import { BadRequestException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { formatWeatherDate } from '../../base/helpers/formatWeatherDate';

const apiKey = 'bbf0bc598ad041f8944135146242805';

@Injectable()
export class GetWeatherUseCase {
  constructor() {}

  async getWeather(city: string) {
    try {
      const res = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`,
      );
      return {
        location: res.data.location.name,
        time: res.data.location.localtime,
        currentTemperature: res.data.current.temp_c,
        dayTemperature: res.data.forecast.forecastday[0].day.maxtemp_c,
        nightTemperature: res.data.forecast.forecastday[0].day.mintemp_c,
        conditionText: res.data.current.condition.text,
        conditionIcon: res.data.current.condition.icon,
        windMPH: res.data.current.wind_mph,
        humidity: res.data.current.humidity,
        chanceOfRain: res.data.forecast.forecastday[0].day.daily_chance_of_rain,
        dateOne: formatWeatherDate(res.data.forecast.forecastday[1].date),
        dayTemperatureOne: res.data.forecast.forecastday[1].day.maxtemp_c,
        nightTemperatureOne: res.data.forecast.forecastday[1].day.mintemp_c,
        dayConditionTextOne: res.data.forecast.forecastday[1].hour[15].condition.text,
        dayConditionIconOne: res.data.forecast.forecastday[1].hour[15].condition.icon,
        nightConditionTextOne: res.data.forecast.forecastday[1].hour[23].condition.text,
        nightConditionIconOne: res.data.forecast.forecastday[1].hour[23].condition.icon,
        dateTwo: formatWeatherDate(res.data.forecast.forecastday[2].date),
        dayTemperatureTwo: res.data.forecast.forecastday[2].day.maxtemp_c,
        nightTemperatureTwo: res.data.forecast.forecastday[2].day.mintemp_c,
        dayConditionTextTwo: res.data.forecast.forecastday[2].hour[15].condition.text,
        dayConditionIconTwo: res.data.forecast.forecastday[2].hour[15].condition.icon,
        nightConditionTextTwo: res.data.forecast.forecastday[2].hour[23].condition.text,
        nightConditionIconTwo: res.data.forecast.forecastday[2].hour[23].condition.icon,
      };
    } catch (err) {
      console.log('Weather get error: ', err);
      throw new BadRequestException([{ message: 'Weather error', field: 'weather' }]);
    }
  }
}
