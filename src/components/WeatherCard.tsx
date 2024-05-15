import { useState } from "react";
import "../App.css";

interface WeatherData {
  name: string;
  main: {
    temp: number;
  };
  weather: {
    description: string;
  }[];
}

const WeatherCard: React.FC = () => {
  const [location, setLocation] = useState<string>("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleSearch = async () => {
    if (!location) {
      console.error("Por favor, informe uma localização válida");
      return;
    }

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=772920597e4ec8f00de8d376dfb3f094`
      );
      const data = await response.json();

      setWeatherData(data);
    } catch (error) {
      console.error("Erro ao buscaros dados do clima", error);
    }
  };

  const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  return (
    <div
      className="main"
      style={{
        height: "100vh",
      }}
    >
      <div
        style={{
          background:
            weatherData && weatherData.main.temp > 25
              ? "linear-gradient(to bottom, rgba(255,255,0,0.5), white)"
              : weatherData && weatherData.main.temp < 20
              ? "blue"
              : "white",
          width: "50%",
          height: "100%",
        }}
      >
        <input type="text" onChange={handleChangeLocation} />
        <button onClick={handleSearch}>Buscar</button>
        {weatherData && (
          <div>
            <div className="location">
              <p>Cidade: {weatherData.name}</p>
            </div>
            <p>Temperatura: {weatherData.main.temp}</p>
            <p>Tempo: {weatherData.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherCard;
