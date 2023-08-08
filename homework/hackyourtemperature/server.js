import express from 'express';

// Initialize the Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(express.json());

// Route for the homepage
app.get('/', (req, res) => {
  res.send('Hello from the backend to frontend!');
});

// Route for weather data
app.post('/weather', (req, res) => {
  const { cityName } = req.body;

  if (!cityName) {
    return res.status(400).json({ error: 'City name is required.' });
  }

  // Process the cityName and fetch weather data (placeholder)
  // const weatherData = fetchWeatherData(cityName);

  // Respond with the weather data
  // res.json({ cityName, weatherData });
  // });

  // For now, just send back the cityName as a placeholder
  res.json({ cityName });
});

// Global error handler middleware
app.use((error, req, res, next) => {
  console.error('An error occurred:', error);
  res.status(500).json({ error: 'Internal server error.' });
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});