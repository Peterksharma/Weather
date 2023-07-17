const apiKey = 'b7000b54fb1d1016ddb36cfff8fb5306'
// const urlCall1 = 'api.openweathermap.org/data/2.5/forecast?q='
// const urlCall2 = '&appid='

//City Search
const searchBtn = document.getElementById('searchBtn')
searchBtn.addEventListener('click', function() {
    const findCity = document.getElementById('citySearch')
    let cityData = findCity.value.split(' ').join('+').toLowerCase()
    fetch (`http://api.openweathermap.org/data/2.5/forecast?q=${cityData}&appid=${apiKey}`)
        .then(response => response.json())
        .then(weatherData => {
            console.log(weatherData)
        })
        .catch(err => console.err('I am broken because...', err))
})
//Preselectd City
const cityBtn = document.getElementsByClassName('cityBtn')
for (let i= 0; i < cityBtn.length; i++) {
    cityBtn[i].addEventListener('click', function() {
        let preSelCity = this.value;
        fetch (`http://api.openweathermap.org/data/2.5/forecast?q=${preSelCity}&appid=${apiKey}`)
        .then(response => response.json())
        .then(weatherData => {
            console.log(weatherData)
        })
        .catch(err => console.err('I am broken because...', err))
    })
}

// cityBtn.addEventListener('click', function() {
//     let preSelCity = cityBtn.value
//     console.log(preSelCity) 
// })