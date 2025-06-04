import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || 'London';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${API_KEY}`;

    const response = await fetch(apiUrl);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'API fetch failed' });
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
