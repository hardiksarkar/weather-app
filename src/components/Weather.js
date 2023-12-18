import React, { useState } from "react";
import summer from "../images/summer.jpg"
import winter from "../images/winter.jpg"
import spring from "../images/spring.jpg"
import autumn from "../images/autumn.jpg"


export default function Weather() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [hemisphere, setHemisphere] = useState("");
  const [season, setSeason] = useState("");
  const [seasonImage,setSeasonimage] = useState(null);

  function fetchWeather() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        // console.log(position.coords.latitude);
        // console.log(position.coords.longitude);
        // setLatitude(position.coords.latitude);
        // setLongitude(position.coords.longitude);
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        if (position.coords.latitude > 0) {
          setHemisphere("Northern Hemisphere");
        } else if (position.coords.latitude < 0) {
          setHemisphere("Southern Hemisphere");
        } else {
          setHemisphere("Equator");
        }

        let date = new Date();
        let month = date.getMonth()+1;
        // console.log(month);
        if (position.coords.latitude > 0) {
          if (month >= 3 && month <= 5) {
            setSeason("Spring Season");
            setSeasonimage(spring)
          } else if (month >= 6 && month <= 8) {
            setSeason("Summer Season");
            setSeasonimage(summer)
          } else if (month >= 9 && month <= 11) {
            setSeason("Autumn/Fall Season");
            setSeasonimage(autumn)
          } else {
            setSeason("Winter Season");
            setSeasonimage(winter);
          }
        }else if(position.coords.latitude<0){
            if (month >= 9 && month <= 11) {
                setSeason("Spring Season");
                setSeasonimage(spring)
            } else if (month >= 12 || (month >= 1 && month <= 2)) {
                setSeason("Summer Season");
                setSeasonimage(summer)
            } else if (month >= 3 && month <= 5) {
                setSeason("Autumn/Fall Season");
                setSeasonimage(autumn)
            } else {
                setSeason("Winter Season");
                setSeasonimage(winter)
            }
        }else{
            setSeason("Equatorial Climate");
            setSeasonimage(summer)
        }
      });
    }
  }

  return (
    <div>
      <button onClick={() => fetchWeather()}>Fetch Weather</button>
      <h3>Latitude : {latitude}</h3>
      <h3>Longitude : {longitude}</h3>
      <h3>Hemisphere : {hemisphere}</h3>
      <h3>Season : {season}</h3>
      <img src={seasonImage} alt={season} className="season-image"/>
    </div>
  );
}
