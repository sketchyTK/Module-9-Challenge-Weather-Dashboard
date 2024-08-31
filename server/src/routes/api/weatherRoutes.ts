import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  try {
   await WeatherService.getWeatherForCity(this.name, this.id );
   res.json('Weather successfully retrieved');
   // TODO: save city to search history
    const savedCities = await HistoryService.addCity();
    res.json(savedCities);
  }
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// TODO: GET search history
// router.get('/history', async (req: Request, res: Response) => {});
//   Response.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
// });

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req, res) => {});

export default router;
