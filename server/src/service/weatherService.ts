import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: string;
  lon: string;
}
// TODO: Define a class for the Weather object
interface Weather {
  tempF: string;
  windSpeed: string;
  humidity: string;
  icon: string;
  iconDescription: string;
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;

  private apiKey?: string;

  private cityName?: string;
  constructor() {
    this.baseURL = process.env.API_BASE_URL || '';

    this.apiKey = process.env.API_KEY || '';
// what is the value supposed to be for the cityName?
    this.cityName = '';
  }
  //  query = `${this.baseURL}/data/2.5/forecast?id=${this.cityName}&appid=${this.apiKey}`;
  
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    
    const response = await fetch(query);
      const locationData = await response.json();
      const mapLocationData =  this.destructureLocationData(locationData.data);
      return mapLocationData; 
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
      const lat = locationData.lat;
      const lon = locationData.lon;
      return { lat, lon };
    }
   
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
  
   const geocodeQuery = `${this.baseURL}/geo/1.0/direct?q=${this.cityName}&limit=1&appid=${this.apiKey}`;
  //api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    //
    return geocodeQuery;
  }
  
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    // To build the weather query we need to use the coordinates, lat & long to 
    const latitude = coordinates.lat;
    const longitude = coordinates.lon;
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`;
    return weatherQuery;
  }

// TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.buildGeocodeQuery());
    const destructureData = this.destructureLocationData(locationData);
    const latitudeFromLocationData = destructureData.lat;
    const longitudeFromLocationData = destructureData.lon;
     return { lat: latitudeFromLocationData, lon: longitudeFromLocationData };
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherAPI = this.buildWeatherQuery(coordinates);
      const response = await fetch(weatherAPI);
      const weatherData = await response.json();
      const weatherDataParser =  this.parseCurrentWeather(weatherData.data);
      return weatherDataParser;
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather[] {
      const currentWeather = response(this.fetchWeatherData);
      const parsedWeather: Weather[] = currentWeather.map((weatherData: any) => {
        const weather: Weather = {
          tempF: weatherData.tempF,
          humidity: weatherData.humidity,
          windSpeed: weatherData.windSpeed,
          iconDescription: weatherData.iconDescription,
          icon:  weatherData.icon,
      };
      return weather;
    });
      return parsedWeather;
  }

  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) : Weather[] {
     
    const forecastArray: Weather[] = [currentWeather]; 

    if (weatherData && Array.isArray(weatherData)) {
        for (const data of weatherData) {
            forecastArray.push({
                tempF: data.tempF,
                humidity: data.humidity,
                windSpeed: data.windSpeed,
                iconDescription: data.iconDescription,
                icon: data.icon
            });
        }
    }
    return forecastArray;
  }
  
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.cityName = city;
    const locationData = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(locationData);
    const currentWeatherArray = this.parseCurrentWeather(weatherData);
    const currentWeather = currentWeatherArray[0];
    const forecastArray = this.buildForecastArray(currentWeather, weatherData);
    return forecastArray;
  }
}

export default new WeatherService();
