import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", __dirname);

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname));

const apiKey = "1ca7d650d2113d1b4b3d851c55183952";

app.get("/", async (req, res) => {
  try {
    const city = req.query.city || 'Mumbai';
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

    const weatherData = {
      city: result.data.name,
      temperature: result.data.main.temp,
      humidity: result.data.main.humidity,
      windSpeed: result.data.wind.speed,
    };

    res.render("index.ejs", {
      weather: weatherData
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/", async (req, res) => {
  try {
    const city = req.body.city || 'Mumbai';
    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);

    const weatherData = {
      city: result.data.name,
      temperature: result.data.main.temp,
      humidity: result.data.main.humidity,
      windSpeed: result.data.wind.speed,
    };

    res.render("index.ejs", {
      weather: weatherData
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
