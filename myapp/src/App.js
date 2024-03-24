import React,{useState} from 'react';
import './App.css';
import clear from '../src/Assets/clear.png';
import cloud from '../src/Assets/cloud.png';
import rain from '../src/Assets/rain.png';
import snow from '../src/Assets/snow.png';
import drizzle from '../src/Assets/drizzle.png';
import humidity from '../src/Assets/humidity.png';
import wind from '../src/Assets/wind.png';

function App() {

  let api_key='be7377befbf477f1c5143d5791f260be';
  const [weather, setWeather] = useState({});

  const search= async () =>{

    const locationInput = document.getElementById('location');
    if (!locationInput || !locationInput.value) {
      return 0;
    }

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${locationInput.value}&appid=${api_key}`;

    let response = await fetch(url);
    let data=await response.json();
    const humidityElement = document.getElementById('humidity_value');
    const windElement = document.getElementById('wind_speed');
    const tempElement = document.getElementById('temperature');
    const placeElement = document.getElementById('location_name');

    humidityElement.innerHTML = data.main.humidity + '%';
    windElement.innerHTML = data.wind.speed + ' km/hr';
    tempElement.innerHTML = (data.main.temp - 273.15).toFixed(2) + '°C';
    placeElement.innerHTML = data.name;

    if(data.weather[0].icon === '01d' || data.weather[0].icon === '01n'){
      setWeather(clear);
    }
    else if(data.weather[0].icon === '02d' || data.weather[0].icon === '02n'){
      setWeather(cloud);
    }
    else if(data.weather[0].icon === '03d' || data.weather[0].icon === '03n' || data.weather[0].icon === '04d' || data.weather[0].icon === '04n'){
      setWeather(drizzle);
    }
    else if(data.weather[0].icon === '09d' || data.weather[0].icon === '09n' || data.weather[0].icon === '10d' || data.weather[0].icon === '10n'){
      setWeather(rain);
    }
    else if(data.weather[0].icon === '13d' || data.weather[0].icon === '13n'){
      setWeather(snow);
    }
    else{
      setWeather(clear);
    }
  }

  return (
    <div className="App">
      <div className='container'>
        <h1>Weather Forecast</h1>
        
        <div className='row' style={{marginTop: '20px'}}>
          <div className='col-md-3'></div>
          
          <div className='col-md-6'>
            <div className='card' style={{backgroundColor: '#1565c0', padding: '30px'}}>
              
              <div className='row'>
                <div className='col-md-10'>
                  <input className='form-control' id='location' type='text' placeholder='Enter region' />
                </div>
                <div className='col-md-2'>
                  <button className='form-control btn btn-primary' onClick={() => {search()}}>Search</button>
                </div>
              </div>

              <div className='row'>
                <div className='col-md-12'>
                  <img src={weather} alt="" />
                </div>
              </div>

              <div className='row' style={{color:'white'}}>
                <div className='col-md-12'>
                  <h1 id='temperature' style={{fontSize:'60px'}}>24°C</h1>
                </div>
              </div>

              <div className='row' style={{color:'white'}}>
                <div className='col-md-12'>
                  {/* <h1 className='region_name' id='location' style={{fontSize:'35px'}}>London</h1> */}
                  <h1 className='region_name' id='location_name' style={{fontSize:'35px'}}>London</h1>
                </div>
              </div>

              <div className='row' style={{marginTop:'20px', color:'white'}}>
                <div className='col-md-4'>

                  <div className='row'>
                    <div className='col-md-6'>
                      <img src={humidity} alt='humidity' style={{float: 'right'}}/>
                    </div>
                    <div className='col-md-6' style={{textAlign: 'left', marginTop:'-14px'}}>
                      <p id='humidity_value' style={{fontSize:'27px', fontWeight: 'bold'}}></p>
                      <p style={{fontSize: '15px', marginTop:'-24px'}}>Humidity</p>
                    </div>
                  </div>

                </div>
                <div className='col-md-3'></div>

                <div className='col-md-5'>
                <div className='row'>

                    <div className='col-md-6'>
                      <img src={wind} alt='wind' style={{float: 'right'}}/>
                    </div>
                    <div className='col-md-6' style={{textAlign: 'left', marginTop:'-5px'}}>
                      <p id='wind_speed' style={{fontSize:'18px', fontWeight: 'bold'}}>18 km/hr</p>
                      <p style={{fontSize: '15px', marginTop:'-24px'}}>Wind speed</p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
          
          <div className='col-md-3'></div>
        </div>

      </div>
    </div>
  );
}

export default App;
