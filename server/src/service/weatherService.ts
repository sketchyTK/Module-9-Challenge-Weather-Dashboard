import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  latitude: string;
  longitude: string;
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
  // const query = `${this.baseURL}/data/2.5/forecast?id=${this.cityName}&appid=${this.apiKey}`;
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(query);
      const locationData = await response.json();
      const mapLocationData =  this.destructureLocationData(locationData.data);
      return mapLocationData; 
    }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
      const latitude = locationData.latitude;
      const longitude = locationData.longitude;
      return { latitude, longitude };
    }
   
  // TODO: Create buildGeocodeQuery method
  private async buildGeocodeQuery(): Promise<string> {
   
    const locationData = await this.fetchAndDestructureLocationData();
    
    const geocodeLat = locationData.latitude;
    const geocodeLon = locationData.longitude;
    const geocodeQuery =   `${this.baseURL}/data/2.5/forecast?lat=${geocodeLat}&lon=${geocodeLon}&appid=${this.apiKey}`;
    return geocodeQuery;
  }
  
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    // To build the weather query we need to use the coordinates, lat & long to 
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}`;
    return weatherQuery;
  }

// TODO: Create fetchAndDestructureLocationData method
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData('<query>');
    const destructureData = this.destructureLocationData(locationData);
    const latitudeFromLocationData = destructureData.latitude;
    const longitudeFromLocationData = destructureData.longitude;
     return { latitude: latitudeFromLocationData, longitude: longitudeFromLocationData };
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherAPI = this.buildWeatherQuery(coordinates);
      const response = await fetch(weatherAPI);
      const weatherData = await response.json();
      const weatherDataParser = await this.parseCurrentWeather(weatherData.data);
      return weatherDataParser;
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(response: any): Weather[] {
      const currentWeather = response;
      const parsedWeather: Weather[] = currentWeather.map((weatherData: any) {
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
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
