const creds = 'b7000b54fb1d1016ddb36cfff8fb5306';

function displayWeatherData(weatherData) {
    // Current day display
    const currentWeather = weatherData.list[0];
    const currentDate = new Date(currentWeather.dt * 1000); 
    const formattedCurrentDate = `${currentDate.getMonth()+1}-${currentDate.getDate()}-${currentDate.getFullYear()}`;
    document.getElementById('currentCity').innerText = weatherData.city.name;
    document.getElementById('currentDate').innerText = `Date: ${formattedCurrentDate}`;
    document.getElementById('currentTemp').innerText = `Temp: ${currentWeather.main.temp}°F`;
    document.getElementById('currentWind').innerText = `Wind: ${currentWeather.wind.speed} mph`;
    document.getElementById('currentHumidity').innerText = `Humidity: ${currentWeather.main.humidity}%`;
    
    // 5-day forecast
    for(let i = 0; i <= 32 && i < weatherData.list.length; i+=8) { 
        const dailyWeather = weatherData.list[i];
        if (dailyWeather) {
            const date = new Date(dailyWeather.dt * 1000); 
            const formattedDate = `${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}`;
            const temp = dailyWeather.main.temp;
            const humidity = dailyWeather.main.humidity;
            const windSpeed = dailyWeather.wind.speed;
    
            document.getElementById(`day${(i/8)+1}`).innerHTML = `
                <p>Date: ${formattedDate}</p>
                <p>Temp: ${temp}°F</p>
                <p>Wind: ${windSpeed} mph</p>
                <p>Humidity: ${humidity}%</p>
            `;
        }
    }
    
}

//Making the containers for the 5day forcast.
function createForecastDivs(days) {
    const wrapper = document.getElementById('forecastWrapper');
    wrapper.innerHTML = '';

    for (let i = 1; i <= days; i++) {
        const forecastDiv = document.createElement('div');
        forecastDiv.className = 'Forecast';
        forecastDiv.id = `day${i}`;

        const date = document.createElement('p');
        date.id = `day${i}Date`;
        date.textContent = 'Date: ';
        forecastDiv.appendChild(date);

        const temp = document.createElement('p');
        temp.id = `day${i}Temp`;
        temp.textContent = 'Temp: ';
        forecastDiv.appendChild(temp);

        const wind = document.createElement('p');
        wind.id = `day${i}Wind`;
        wind.textContent = 'Wind: ';
        forecastDiv.appendChild(wind);

        const humidity = document.createElement('p');
        humidity.id = `day${i}Humidity`;
        humidity.textContent = 'Humidity: ';
        forecastDiv.appendChild(humidity);

        wrapper.appendChild(forecastDiv);
    }
}

createForecastDivs(5);


//City Search
document.getElementById('searchBtn').addEventListener('click', function() {
    const cityData = document.getElementById('citySearch').value.split(' ').join('+').toLowerCase();
    fetch (`http://api.openweathermap.org/data/2.5/forecast?q=${cityData}&appid=${creds}&units=imperial`)
        .then(response => response.json())
        .then(weatherData => {
            displayWeatherData(weatherData, true);
        })
        .catch(err => console.log('I am broken because...', err));
});

//Preselected City
const cityBtn = document.getElementsByClassName('cityBtn');
for (let i= 0; i < cityBtn.length; i++) {
    cityBtn[i].addEventListener('click', function() {
        const preSelCity = this.value;
        fetch (`http://api.openweathermap.org/data/2.5/forecast?q=${preSelCity}&appid=${creds}&units=imperial`)
        .then(response => response.json())
        .then(weatherData => {
            displayWeatherData(weatherData, true);
        })
        .catch(err => console.log('I am broken because...', err));
    });
}