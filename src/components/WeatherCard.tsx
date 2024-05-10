import { useState } from "react";

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
      style={{
        backgroundColor:
          weatherData && weatherData.main.temp > 25
            ? "yellow"
            : weatherData && weatherData.main.temp < 20
            ? "blue"
            : "white",
        width: "100%",
        height: "100%",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <input type="text" onChange={handleChangeLocation} />
      <button onClick={handleSearch}>Buscar</button>
      {weatherData && (
        <div>
          <p>Localização: {weatherData.name}</p>
          <p>Temperatura: {weatherData.main.temp}</p>
          <p>Tempo: {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
