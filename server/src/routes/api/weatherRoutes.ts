import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const (WeatherService.name, WeatherService.id) = req.body;
  try (req.body) {
   await WeatherService.getWeatherForCity(name, id );
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
router.get('/history', async (req, res) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

// * BONUS TODO: DELETE city from search history
// router.delete('/history/:id', async (req, res) => {});

export default router;
