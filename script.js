const API =  '4e51576d245f063c485cb7d94c40a99a';
let local = 'London';

const weatherContainer =  document.querySelector('.weatherContainer');
const form =  document.querySelector('form');
const input =  document.querySelector('input');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    weatherContainer.innerHTML = `<h1>loading...</h1>`
    getWeatherInfo(undefined, undefined, input.value)
    input.value = '';
})

weatherContainer.addEventListener('click', (e) => {
    if(e.target.classList.contains('celsius')) {
        console.log(weatherObj);
        const tempHtml = document.querySelector('.temp');
        tempHtml.textContent = `${weatherObj.tempF}°F`
        
    }
})

let weatherObj;

async function getWeatherInfo(lat, lon, city) {
    let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?${lat ? `lat=${lat}&` : ''}${lon ? `lon=${lon}` : ''}${city ? `q=${city}` : ''}&appid=a7d156cdeaefed1390ffe6fdbed1a4e6`, {mode: 'cors'});
    let weather = await weatherData.json();
    const celsius = Math.round(((weather.main.temp - 273.15) + Number.EPSILON) * 10) / 10;
    const fahr = celsius * 9 / 5 + 32;
    weatherObj = {
        location: weather.name,
        weather: weather.weather[0].description,
        tempC: celsius,
        tempF: fahr,
        humidity: weather.main.humidity,
        pressure: weather.main.pressure,
        name: weather.name
    }
    console.log(weatherObj)

    const weatherHtml = `
    <div class="weatherDetails">
        <h3 class="location">${weatherObj.name}</h3>
        <h5 class="weather">${weatherObj.weather}</h5>
        <h5 class="temp">${weatherObj.tempC}°C</h5>
        <h5 class="humidity">Humidity ${weatherObj.humidity}%</h5>
        <h5 class="pressure">Pressure ${weatherObj.pressure}hPa</h5>
        <button class="celsius">Show in °F</button>

    </div>
    `
    weatherContainer.innerHTML = weatherHtml;

}



navigator.geolocation.getCurrentPosition((userLocation) => {
    const lon = Math.round((userLocation.coords.longitude + Number.EPSILON) * 100) / 100;
    const lat = Math.round((userLocation.coords.latitude + Number.EPSILON) * 100) / 100;

    getWeatherInfo(lat, lon);
}, (error) => {
    console.log(error)
}
    
    )
