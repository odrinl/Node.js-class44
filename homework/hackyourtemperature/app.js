import express from 'express';
import { API_KEY } from './sources/keys.js';

// Create an Express app
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Define a route for the homepage
app.get('/', (req, res) => {
  res.send('hello from backend to frontend!');
});

// POST route for /weather
app.post('/weather', async (req, res) => {
  const {cityName} = req.body; // Access cityName from the request body
  if (!cityName) {
    res.status(400).send({ weatherText: "City is required!" });
    return;
  }
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
  const fetchWeather = await fetch(apiUrl);
  const data = await fetchWeather.json();
  if (data.cod === "404") {
    res.status(404).send({ weatherText: "City is not found!" });
    return;
  }
  const temperature = data.main.temp;
  res.send({cityName, temperature});
});

// Export the app as the default export
export default app;