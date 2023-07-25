const weatherApi = {
    key : '1583a8c1140f569ff45c57f17ec621eb',
    baseUrl : 'https://api.openweathermap.org/data/2.5/weather'
}


function getWeatherReport(city){
    //  * fetch('https://api.openweathermap.org/data/2.5/weather?q=Tunis&appid=1583a8c1140f569ff45c57f17ec621eb&units=metric')
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(data => { return  data.json()})
    .then(showWeatherReport)
    .catch(err => alert('ERRO HAPPENED'))
}

let searchInputBox = document.getElementById('input-box');

searchInputBox.addEventListener('keypress', (e)=>{
if(e.key === 'Enter'){
  getWeatherReport(searchInputBox.value)
}
})
function showWeatherReport(weather){
let city_code = weather.cod ;
if(city_code === '400'){
    alert('Empty input, enter any city name')
}
else if (city_code ==='404'){
    alert("Bad input , city name is not matched")
}
else {
  let op = document.getElementById('weather-body');
  let parent = document.getElementById('parent');
  op.style.display = 'block';
  op.innerHTML = `
  <div class="location-details">
   <div class="city">${weather.name} , ${weather.sys.country}</div> 
   <div class="date">${new Date()}</div> 
  </div>
  <div class="weather-status">
  <div class="temp">${Math.round(weather.main.temp)}&deg;C</div> 
  <div class="weather">${weather.weather[0].main}</div> 
  <div class="min-max">${Math.floor(weather.main.temp_min)}&deg;C
    / ${Math.ceil(weather.main.temp_max)}&deg;C </div> 
 </div>
  
  `;
  parent.append(op);
  changeBg(weather.weather[0].main);

}
}

function changeBg(weather_status){
    if(weather_status === 'Clear'){
        document.body.style.backgroundImage = "url(claire.jpeg)"
    }
     if(weather_status ==='Rain'){
        document.body.style.backgroundImage='url(pluie.jpg)'
    }
     if(weather_status ==='Clouds'){
        document.body.style.backgroundImage='url(nuage.jpeg)'
    }
    // Rain,Snow,sunny,clouds
}
