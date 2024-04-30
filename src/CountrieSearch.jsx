import { useEffect, useState } from "react";
import axios from "axios";
import "./CountrieSearch.css";

const CountryCard = ({ data }) => {
  return (
    <div className="countryCard">
      <img src={data.flags.svg} alt={data.name.common} />
      <h2>{data.name.common}</h2>
    </div>
  );
};

const CountrieSearch = () => {
  const [countryData, setCountryData] = useState([]);
  const [filterCountryData, setFilterCountryData] = useState([]);
  const [searchText, setSearchText] = useState("");

  const fetchCountryData = async () => {
    try {
      let response = await axios.get("https://restcountries.com/v3.1/all");
      setCountryData(response.data);
      // setFilterCountryData(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  var filteredData = countryData.filter((country) =>
    country.name.common.includes(searchText)
  );
  // console.log(filteredData);

  useEffect(() => {
    fetchCountryData();
  }, []);
  return (
    <>
      <div>
        <div className="inputWrapper">
          <input
            type="text"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
        </div>

        <div className="wrapper">
          {searchText === ""
            ? countryData.map((country) => (
                <CountryCard key={country.name.common} data={country} />
              ))
            : filteredData.map((country) => (
                <CountryCard key={country.name.common} data={country} />
              ))}
        </div>
      </div>
    </>
  );
};

export default CountrieSearch;
