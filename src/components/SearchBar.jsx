import { useState, useEffect } from "react";
import WeatherBody from "./WeatherBody";
import WeekWeather from "./WeekWeather";
import cities from "../data/cityList";

const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const [Cities, setCities] = useState([]);
  const [chosenCity, setChosenCity] = useState("new york");

  useEffect(() => {
    setCities(cities);
  }, []);

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setInput(inputValue);

    const filteredCitites = cities.filter((city) =>
      city.toLowerCase().includes(inputValue.toLowerCase())
    );

    setCities(filteredCitites);
  };

  const handleSubmit = async () => {
    setChosenCity(input);
    setInput("");
  };

  const topFour = Cities.slice(0, 4);

  return (
    <>
      <div className="search-bar">
        <h1>Find City</h1>
        <br />
        <div className="submit-area">
          <div className="search-and-submit">
            <input type="text" value={input} onChange={handleInputChange} />
            <br />
            <br />
            <button type="submit" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          {topFour.map((res) => {
            return (
              <div
                className={`${input === "" ? "hidden" : "search-result"}`}
                onClick={() => setInput(res)}
              >
                {res}
              </div>
            );
          })}
        </div>
        <WeatherBody unit={props.unit} city={chosenCity} />
        <WeekWeather unit={props.unit} city={chosenCity} />
      </div>
    </>
  );
};

export default SearchBar;
