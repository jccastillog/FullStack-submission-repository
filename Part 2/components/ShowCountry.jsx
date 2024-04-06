import React from "react";
const ShowCountry = ({ countries, weather }) => {
    const urlIcon='https://openweathermap.org/img/wn/'
    return(
    (
    <section>
        <div>
            <h1 > {countries.name.common} </h1>
            <li className='phone'> Capital {countries.capital} </li> 
            <li className='phone'> Area {countries.area} </li> 
            <h1>Languages:</h1>
            {Object.values(countries.languages).map(el => 
                <li className='phone'> {el} </li> 
            )}                    
            <img  src={countries.flags.png}/> 
            <h1>Weather in {countries.capital}</h1>
            <h3>Temperature {weather.main.temp} celsius</h3>
            <h3>Wind {weather.wind.speed} m/s</h3>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Weather Icon" />
        </div>
    </section>)
    )

}
export default ShowCountry