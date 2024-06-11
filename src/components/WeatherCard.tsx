import { useState } from "react";
import "./styles/WeatherCard.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
    pressure: number;
    feels_like: number;
  };
  weather: {
    description: string;
  }[];
  wind: {
    speed: number;
  };
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
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c6df0b871b65037eff595b5de6efa912&units=metric`
      );
      const data = await response.json();

      setWeatherData(data);
    } catch (error) {
      console.error("Erro ao buscar os dados do clima", error);
    }
  };

  const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  return (
    <div className="weather-card">
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container fluid>
          <Navbar.Brand href="#">Previsão do tempo</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Row className="w-100">
              <Col xs={3}></Col>
              <Col xs={6}>
                <Form className="d-flex justify-content-center">
                  <Form.Control
                    type="text"
                    placeholder="Digite a localização"
                    className="me-2"
                    aria-label="Search"
                    onChange={handleChangeLocation}
                  />
                  <Button variant="outline-success" onClick={handleSearch}>
                    Pesquisar
                  </Button>
                </Form>
              </Col>
              <Col xs={3}></Col>
            </Row>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <section className="weather-info">
        {weatherData && (
          <div className="main__result-item">
            <p>Localização: {weatherData.name}</p>
            <p>Temperatura: {weatherData.main.temp} °C</p>
            <p>Vento: {weatherData.wind.speed} m/s</p>
            <p>Umidade: {weatherData.main.humidity} %</p>
            <p>Pressão: {weatherData.main.pressure} hPa</p>
            <p>Sensação Térmica: {weatherData.main.feels_like} °C</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default WeatherCard;
