import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/Weather";

const API_WEATHER = "ab85fa5adadf27e7f1b47f0755f9fee5";

class App extends React.Component {
  state = {
    temp: undefined,
    temp_min: undefined,
    temp_max: undefined,
    location: undefined,
    country: undefined,
    humidity: undefined, // влажность
    pressure: undefined, // давление
    wind_speed: undefined,
    wind_deg: undefined,
    error: undefined
  };

  getWeather = async event => {
    event.preventDefault();
    let city = event.target.elements.city.value;
    if (city) {
      const api_url = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_WEATHER}&units=metric`
      );
      const storage = await api_url.json();
      // console.log(storage); // оставляю строку закомменченой для отладки

      this.setState({
        temp: storage.main.temp,
        temp_min: storage.main.temp_min,
        temp_max: storage.main.temp_max,
        city: storage.name,
        country: storage.sys.country,
        humidity: storage.main.humidity, // влажность
        pressure: storage.main.pressure, // давление
        wind_speed: storage.wind.speed,
        wind_deg: storage.wind.deg,
        error: undefined
      });
    } else {
      this.setState({
        temp: undefined,
        temp_min: undefined,
        temp_max: undefined,
        city: undefined,
        location: undefined,
        country: undefined,
        humidity: undefined, // влажность
        pressure: undefined, // давление
        wind_speed: undefined,
        wind_deg: undefined,
        error: "Enter the correct city!"
      });
    }
  };

  getDirection(x) {
    // перевод из град в направление согласно изображению:
    // https://dpva.ru/Guide/GuideUnitsAlphabets/GuideUnitsAlphabets/WindRoseRuEng/
    let a;
    if ((337.5 < x && x <= 360) || (0 <= x && x <= 22.5)) {
      a = "N";
      return a;
    } else if (22.5 < x && x <= 65.5) {
      a = "NE";
      return a;
    } else if (65.5 < x && x <= 112.5) {
      a = "E";
      return a;
    } else if (112.5 < x && x <= 157.5) {
      a = "SE";
      return a;
    } else if (157.5 < x && x <= 202.5) {
      a = "S";
      return a;
    } else if (202.5 < x && x <= 247.5) {
      a = "SW";
      return a;
    } else if (247.5 < x && x <= 292.5) {
      a = "W";
      return a;
    } else if (292.5 < x && x <= 337.5) {
      a = "NW";
      return a;
    }
  }

  render() {
    return (
      <div className="wrapper">
        <div className="main">
          <div className="container">
            <div className="row">
              <div className="cal-xs-5 info">
                <Info />
              </div>
              <div className="cal-xs-7 form">
                <Form weatherGetter={this.getWeather} />
                <Weather
                  temp={this.state.temp}
                  temp_min={this.state.temp_min}
                  temp_max={this.state.temp_max}
                  city={this.state.city}
                  country={this.state.country}
                  humidity={this.state.humidity}
                  pressure={(this.state.pressure / 1.33322).toFixed(2)}
                  // 1.33322 - перевод из кПа в мм рт ст,
                  // затем округлем до 2 знаков после запятой - .toFixed(2)
                  wind_speed={this.state.wind_speed}
                  wind_deg={this.state.wind_deg}
                  wind_direction={this.getDirection(this.state.wind_deg)}
                  error={this.state.error}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
