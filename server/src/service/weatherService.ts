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
    this.cityName = ;
  }
  const query = `${this.baseURL}/data/2.5/forecast?id=${this.cityName}&appid=${this.apiKey}`;
  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    const response = await fetch(query);
      const locationData = await response.json();
      const mapLocationData =  this.destructureLocationData(locationData.data);
      return mapLocationData; 
    }
  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    const locationArray: Coordinates[] = locationData.map(({ lat, lon }: Coordinates) => {

        return { lat, lon };
    });

    return locationArray;
    // const locationArray: Coordinates[] = locationData.map((location: any) => {
    //   const locationObject: Coordinates = {
    //     lat: location.lat,
    //     lon: location.lon,
    //   };
    //         return locationObject;
    // });

    // return locationArray[0];
  }
  // TODO: Create buildGeocodeQuery method
  private buildGeocodeQuery(): string {
    let geocodeLat = this.fetchLocationData();
    const geocodeQuery =   `${this.baseURL}/data/2.5/forecast?lat=${geocodeLat}&lon=${this.destructureLocationData.lon}&appid=${this.apiKey}`;
    return geocodeQuery;
  }
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
// TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
}

export default new WeatherService();
