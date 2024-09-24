import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  tempF: number;
  windSpeed: number;
  humidity: number;
  icon: string;
  description: string; 
  constructor(
    city: string,
  date: string,
  tempF: number,
  windSpeed: number,
  humidity: number,
  icon: string,
  description: string
  )
  {
    this.city = city;
  this.date = date;
  this.tempF = tempF;
  this.windSpeed = windSpeed;
  this.humidity = humidity;
  this.icon = icon;
  this.description = description;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;

  private apiKey?: string;

  private city = '';
  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';

    this.apiKey = process.env.API_KEY || '';
// what is the value supposed to be for the cityName?

  }
  //  query = `${this.baseURL}/data/2.5/forecast?id=${this.cityName}&appid=${this.apiKey}`;
  
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      if (!this.baseURL || !this.apiKey) {
        throw new Error('API base URL or API key not found');
      }
    const response: Coordinates[] = await fetch(query).then((res) =>
      res.json()
    );
      return response[0];
  } 
      catch (error) {
        console.error(error);
        throw error;
      }
    }

  // TODO: Create destructureLocationData method
//   private destructureLocationData(locationData: Coordinates): Coordinates {
//     const locationArray: Coordinates = locationData.map((location: any) => {
//         const locationObject: Coordinates = {
//             latitude: location.latitude,
//             longitude: location.longitude,
//         };
//         return locationObject;
//     });

//     return locationArray;
// }
  
  private destructureLocationData(locationData: Coordinates): Coordinates {
    if (!locationData) {
      throw new Error('City not found');
    } 
    const { name, lat, lon, country, state } = locationData;
    
    const coordinates: Coordinates = {
      name,
      lat,
      lon,
      country,
      state,
    };
     return coordinates;
    }
   
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
  
   const geocodeQuery = `${this.baseURL}/geo/1.0/direct?q=${this.city}&limit=1&appid=${this.apiKey}`;
   return geocodeQuery;
  }
  
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    // To build the weather query we need to use the coordinates, lat & long to 
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=imperial&appid=${this.apiKey}`;
    return weatherQuery;
  }

// TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
     return await this.fetchLocationData(this.buildGeocodeQuery()).then((data) => this.destructureLocationData(data)
    );
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    try {
      const response = await fetch(this.buildWeatherQuery(coordinates)).then(
        (res) => res.json()
      );
      if (!response) {
        throw new Error('Weather data not found');
      }
      const currentWeather: Weather = this.parseCurrentWeather(
        response.list[0]
      );
      const forecast: Weather[] = this.buildForecastArray(
        currentWeather,
        response.list
      );
      return forecast;
    }
    catch (error: any) {
      console.error(error);
      return error;
    }
  }
  private parseCurrentWeather(response: any) {

    const currentWeather = new Weather(
      this.city,
      response.main.date,
      response.main.temp,
      response.wind.speed,
      response.main.humidity,
      response.weather[0].icon,
      response.weather[0].description || response.weather[0].main
    );

    return currentWeather;
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const weatherForecast: Weather[] = [currentWeather]; 

    const filterWeatherData = weatherData.filter((data:any) => {
      return data.dt_txt.includes('12:00:00');
    });
    
    for (const day of filterWeatherData) {
      weatherForecast.push(
        new Weather(
          this.city,
          day.date.format('M/D/YYY'),
          day.main.temp,
          day.wind.speed,
          day.main.humidity,
          day.weather[0].icon,
          day.weather[0].description || day.weather[0].main
        )
      );
    }
    return weatherForecast;
  }
  
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    try {
    this.city = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    if (coordinates) {
      const weather = await this.fetchWeatherData(coordinates);
      return weather;
    }
    throw  new Error('Weather data not found');
  } catch (error) {
      console.error(error);
      return error;
    }
    
  }
}

export default new WeatherService();
