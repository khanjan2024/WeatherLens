function getWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherDisplay = document.getElementById('weatherDisplay');
    const errorDisplay = document.getElementById('errorDisplay');

    // Clear previous data
    weatherDisplay.innerHTML = '';
    errorDisplay.innerHTML = '';

    // Fetch 5-day weather from the OpenWeatherMap API
    const apiKey = 'fcc8de7015bbb202209bbf0261babf4c'; // Replace with your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "200") {
                const forecast = processForecastData(data.list);
                displayWeather(forecast, data.city);
            } else {
                errorDisplay.innerHTML = 'City not found!';
            }
        })
        .catch(error => {
            errorDisplay.innerHTML = 'Error fetching data!';
        });
}

function processForecastData(data) {
    const forecast = {};
    
    data.forEach(item => {
        const date = item.dt_txt.split(' ')[0]; // Get only the date part (YYYY-MM-DD)
        
        if (!forecast[date]) {
            forecast[date] = {
                temp: item.main.temp,
                weather: item.weather[0].description,
                icon: item.weather[0].icon,
                humidity: item.main.humidity
            };
        }
    });
    
    return forecast;
}

function displayWeather(forecast, city) {
    const weatherDisplay = document.getElementById('weatherDisplay');
    weatherDisplay.innerHTML = `<h3>5-Day Weather Forecast for ${city.name}, ${city.country}</h3>`;

    Object.keys(forecast).forEach(date => {
        const day = forecast[date];
        weatherDisplay.innerHTML += `
            <div class="forecast-day">
                <p><strong>${date}</strong></p>
                <img src="http://openweathermap.org/img/wn/${day.icon}@2x.png" alt="${day.weather}">
                <p>Temperature: ${day.temp}°C</p>
                <p>Weather: ${day.weather}</p>
                <p>Humidity: ${day.humidity}%</p>
            </div>
        `;
    });
}

