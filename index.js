//variables
const baseURL = 'https://weatherapi-com.p.rapidapi.com/current.json';
const showWeatherButton = document.getElementById("showWeather")
const mainTitle = document.querySelector(".main-title")
const currentTime = document.getElementById("currentTime")
const lastUpdated = document.getElementById("lastUpdated")
const currentWeather = document.getElementById("currentWeather")
const preview = document.querySelector(".preview")

preview.hidden = false
showWeatherButton.hidden = true

//taken from: https://rapidapi.com/weatherapi/api/weatherapi-com/
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'a36b7edebbmsh13699bf11202952p1ffab0jsnd6e4fdd7e910',
		'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
	}
};



function success(position){
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    preview.hidden = true
    showWeatherButton.hidden = false
    console.log(latitude, longitude)

    showWeatherButton.addEventListener("click", async () => {
        updatedURL = `${baseURL}?q=${latitude}%2C${longitude}`
        try {
            console.log(updatedURL)
            const response = await fetch(updatedURL, options);
            const data = await response.json()
            const weather = data.current
            const location = data.location
            

            mainTitle.textContent = `Weather for ${location.name}, ${location.region}, ${location.country}`

            currentTime.textContent = `Current time: ${location.localtime}`
            lastUpdated.textContent = `Weather last updated: ${weather.last_updated}`

            currentWeather.textContent = `It is currently ${weather.temp_c}°C (${weather.temp_f}°F)
            but feels like ${weather.feelslike_c}°C (${weather.feelslike_f}°F)
            and is ${weather.condition.text}`

            showWeatherButton.hidden = true


        } catch (error) {
            console.error(error);
        }
        
    })
    
}

if(!navigator.geolocation){
    console.log("womp womp")
}
else{
    navigator.geolocation.getCurrentPosition(success)
}