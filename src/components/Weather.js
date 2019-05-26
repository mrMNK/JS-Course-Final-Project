import React from "react";

class Weather extends React.Component {
  render() {
    return (
      <div>
        {this.props.city && (
          <div>
            <p>
              Location: {this.props.city}, {this.props.country}
            </p>
            <p>
              Current temperature: {this.props.temp}°C (min:{" "}
              {this.props.temp_min}°C / max: {this.props.temp_max}°C)
            </p>
            <p>Humidity: {this.props.humidity} %</p>
            <p>Pressure: {this.props.pressure} mmHg</p>
            <p>
                Wind: {this.props.wind_speed} m/s    direction to: {this.props.wind_direction} (
                {this.props.wind_deg}°)
            </p>
          </div>
        )}
        <p>{this.props.error}</p>
      </div>
    );
  }
}

export default Weather;
