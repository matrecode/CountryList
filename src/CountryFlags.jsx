import React, { useState, useEffect } from "react";
import styles from "./CountryFlags.module.css";

const CountryFlags = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  function fetchCountry() {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.log("APi is not working", error));
  }

  useEffect(() => {
    fetchCountry();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <div className={styles.container}>
        <input type="text" value={search} onChange={handleSearchChange} />
        <div className={styles.box}>
          {search === ""
            ? countries.map((country) => (
                <div className={styles.countryCard} key={country.name.common}>
                  <img src={country.flags.png} alt={country.name.common} />
                  <p>{country.name.common}</p>
                </div>
              ))
            : filteredCountries.map((country) => (
                <div className={styles.countryCard} key={country.name.common}>
                  <img src={country.flags.png} alt={country.name.common} />
                  <p>{country.name.common}</p>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default CountryFlags;
