import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {FontAwesomeIcon} from  '@fortawesome/react-fontawesome';
import {faWind, faTowerBroadcast, faWater, } from '@fortawesome/free-solid-svg-icons'

const Weather = () => {

    
    const [weather , setWeather ] = useState('');

    const [ temperature, setTemperature ] = useState(0);
    const [ isKelvin, setIsKelvin ] = useState(true);
    
    

    


    useEffect( () => {

        const error = () => {
            console.log('No se pudo obtener la ubicacion ')
        }

        //funcion que obtiene posiciones
        const success = (pos) => {
        const lati = pos.coords.latitude;
        const longi = pos.coords.longitude;


        // Importacion de la API 
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&appid=fef970fef5e41e5528561952114f3d22`)
            .then((res) => { 
                setWeather(res.data);
                setTemperature(res.data.main.temp)
                
            })
    
    };

    
        navigator.geolocation.getCurrentPosition(success, error)

        

    }, [] )

  

    // const toCelsius = Math.round(temperature - 273) ;
    // const toFaren = (temperature - 273) * 9/5 + 32 ;

    

    const convertTemp = () => {

        if(isKelvin){
            // setTemperature(toCelsius)
            setIsKelvin(false)
        }else {
            // setTemperature(toFaren)
            setIsKelvin(true)
        }
    }

    
    
        
 
        
    return (
        <div className='weather-app'>
            
            <h1> {Math.round(temperature - 273 )} {isKelvin ? '°C' : '°F'} </h1>
            <h4> {weather.weather?.[0].description}</h4>
            <h5> {weather.name} , {weather.sys?.country} </h5> 
            


            <div className='icon-list'>

                <img src={`https://openweathermap.org/img/wn/${weather?.weather?.[0].icon}@2x.png`} alt="" />

                <ul>
                    <li> <FontAwesomeIcon icon={faWind} /> <b>Wind speed: </b>  { Math.round(weather.wind?.speed * 3.5) } km/h  </li>
                    <li> <FontAwesomeIcon icon={faTowerBroadcast}/> <b>Pressure    </b>  {weather.main?.pressure} mb </li>
                    <li> <FontAwesomeIcon icon={faWater} /> <b>Humidity:   </b>  {weather.main?.humidity} %  </li>
                </ul>
                
            </div>
            <button onClick={convertTemp}> {isKelvin ? '°F' : '°C' } </button>
        </div>
    );
};

export default Weather;