"use strict";

const express = require("express");

const PORT = process.env.PORT;
const HOST = "0.0.0.0";

const app = express();

var previusTemperature = 0;

app.get("/v1/forecast", (req, res) => {
  var currentTemperature = previusTemperature + 25;
  if (currentTemperature > 100) {
    previusTemperature = 0;
  } else {
    previusTemperature = currentTemperature;
  }

  res.send({
    latitude: 19.375,
    longitude: -155.625,
    generationtime_ms: 0.40209293365478516,
    utc_offset_seconds: 3600,
    timezone: "Europe/Berlin",
    timezone_abbreviation: "CET",
    elevation: 3988.0,
    current_weather: {
      temperature: currentTemperature,
      windspeed: 57.4,
      winddirection: 241.0,
      weathercode: 61,
      time: "2022-12-20T00:00",
    },
  });
});

app.get("*", function (req, res) {
  res.status(404).send(message);
});

app.listen(PORT, HOST, () => {
  console.log(`Running on http://${HOST}:${PORT}`);
});
