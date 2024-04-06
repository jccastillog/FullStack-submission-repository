import React from "react";
import ShowCountry from "./ShowCountry";
const Country = ({ countries,cant, handleCountryShow, weather }) => {
        if(cant > 10){ 
            return (
                (<p>Too many matches, please specify another filter</p>)
            )
        }else{
            if(cant===1){
                return(
                (<div>
                    <ShowCountry countries={countries} weather={weather} /> 
                </div>)
                )
            }else{
                return (
                    (
                    <div>
                    <li className='phone'> {countries.name.common} 
                    <button value={countries.name.common} onClick={handleCountryShow}>Show</button>
                    </li>
                    </div>
                    )
                )
            }
        }
}
export default Country