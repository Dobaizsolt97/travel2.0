const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const fetch = require("node-fetch");
const port = 8081;

const app = express();

//
const baseUrl = "http://api.geonames.org/searchJSON?q=";
const userName = "username=dobaizsolt";
const apiSetting = "+&maxRows=1&";
const pixabayBase = "https://pixabay.com/api/?key=";
//

app.use(express.static("dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

const travelData = {};

app.listen(port, () => console.log(`App running on prot ${port}`));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("/dist/index.html"));
});

app.post("/travel-info", (req, res) => {
  const { city, date } = req.body;
  if (timeInterval(date)) {
    travelData.when = "this week";
  } else {
    travelData.days = (new Date(`${date}`).getTime() / 1000).toFixed(0);
  }
  travelData.city = city;
  travelData.date = date;
  getCityInfo(city);
  res.send("added");
});

app.get("/travel-info", (req, res) => {
  res.send(travelData);
});

function timeInterval(date) {
  let d = new Date();
  let month = d.getMonth() + 1;
  let day = d.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  let currDate = d.getFullYear() + "-" + month + "-" + day;
  let unixTimestampnow = (new Date(`${currDate}`).getTime() / 1000).toFixed(0);
  let unixTimestampfuture = (new Date(`${date}`).getTime() / 1000).toFixed(0);
  travelData.when = `in ${(unixTimestampfuture - unixTimestampnow) /
    86400} days`;
  if (unixTimestampfuture - unixTimestampnow <= 604800) {
    return true;
  } else {
    return false;
  }
}
async function getCityInfo(city) {
  const data = await fetch(`${baseUrl}${city}${apiSetting}${userName}`);
  const parsed = await data.json();
  travelData.country = parsed.geonames[0].countryName;
  travelData.lon = parsed.geonames[0].lng;
  travelData.lat = parsed.geonames[0].lat;
  getWeather(travelData.lat, travelData.lon, travelData.when, city);
}

async function getWeather(latitude, longitude, date, city) {
  if (travelData.when == "this week") {
    const data = await fetch(
      `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${latitude},${longitude}`
    );
    const response = await data.json();
    const relevantData = response.daily.data[7];
    const { temperatureLow, temperatureHigh, summary } = relevantData;

    travelData.response = {
      low: `${((temperatureLow - 32) / 1.8).toFixed(1)} celsius`,
      high: `${((temperatureHigh - 32) / 1.8).toFixed(1)} celsius`,
      summary: summary
    };
  } else {
    const data = await fetch(
      `https://api.darksky.net/forecast/${process.env.DARK_SKY_KEY}/${latitude},${longitude},${travelData.days}`
    );
    const response = await data.json();
    const relevantData = response.daily.data[0];

    const { temperatureLow, temperatureHigh, summary = "" } = relevantData;
    travelData.response = {
      low: `${((temperatureLow - 32) / 1.8).toFixed(1)} celsius`,
      high: `${((temperatureHigh - 32) / 1.8).toFixed(1)} celsius`,
      summary: summary
    };
  }
  getImage(city);
}

async function getImage(city) {
  const text = `${city}+city`;
  const response = await fetch(
    `${pixabayBase}${process.env.PIXABAY_KEY}&q=${text}&image_type=photo`
  );
  const data = await response.json();
  const imageData = data.hits[0];
  if (imageData) {
    travelData.image = {
      imageLink: imageData.webformatURL
    };
  } else {
    travelData.image = {
      imageLink:
        "https://pixabay.com/get/57e8d5444e5aaa14f6da8c7dda79367b1036dce353566c4870277fd69e48cc5eb8_640.jpg"
    };
  }
}
