import React, { useState } from "react";
import axios from "axios";
import WeatherForecastPreview from "./WeatherForecastPreview";

export default function Forecast(props) {
  const [loaded, setLoaded] = useState(false);
  const [forecast, setForecast] = useState(null);
  function handleForecastResponse(response) {
    setForecast(response.data);
    setLoaded(true);
  }

  if (loaded && props.city === forecast.city.name) {
    return (
      <div className="Forecast">
        <div className="card">
          <div className="card-body">
            <h2>Hourly Forecast for {props.city}</h2>

            <br />
            <div className="row">
              <WeatherForecastPreview data={forecast.list[0]} />
              <WeatherForecastPreview data={forecast.list[1]} />
              <WeatherForecastPreview data={forecast.list[2]} />
              <WeatherForecastPreview data={forecast.list[3]} />
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    const apiKey = "2e85ceac5b7aab61ec3567d2389a4fd2";
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=${apiKey}&units=metric`;
    axios.get(url).then(handleForecastResponse);

    return null;
  }
}
