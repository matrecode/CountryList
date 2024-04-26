import React, { useState, useEffect } from "react";
import styles from "./CountryFlags.module.css";

const useDebounce = (value, delay) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
};

const CountryFlags = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const debounceSearch = useDebounce(search, 300);
  function fetchCountry() {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.log("APi is not working", error));
  }

  useEffect(() => {
    fetchCountry();
  }, []);

  useEffect(() => {
    // Filter countries only when debounced search value changes
    if (debounceSearch !== "") {
      const filteredCountries = countries.filter((country) =>
        country.name.common.toLowerCase().includes(debounceSearch.toLowerCase())
      );
      setCountries(filteredCountries);
    } else {
      // Reset countries to show all when search input is empty
      fetchCountry();
    }
  }, [debounceSearch]);
  // console.log(filteredCountries);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <input type="text" value={search} onChange={handleSearchChange} />
      <div className={styles.container}>
        {countries.map((country) => (
          <div className={styles.countryCard} key={country.name.common}>
            <img src={country.flags.png} alt={country.name.common} />
            <p>{country.name.common}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default CountryFlags;
