import React, { useState, useEffect } from "react";
import styles from "./CountryFlags.module.css";

const CountryFlags = () => {
  const [country, setCountry] = useState([]);
  function fetchCountry() {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setCountry(data))
      .catch((error) => console.log("APi is not working", error));
  }

  useEffect(() => {
    fetchCountry();
  }, []);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.box}>
          {country.map((country) => (
            <div className={styles.card} key={country.name.common}>
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
