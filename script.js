("use strict");

const inputCity = document.getElementById("input-city");
let city = "";
const cityName = document.getElementById("city");
const temperature = document.getElementById("temperature");
let kelwinToCelsius = 273;
const description = document.getElementById("desc");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const humidity = document.getElementById("humidity");
const cloudiness = document.getElementById("cloudiness");
let coords = [];

inputCity.focus();

inputCity.addEventListener("change", (e) => {
  city = e.target.value;
  getWeather(city);
});

const currLocation = navigator.geolocation.getCurrentPosition((pos) => {
  const lat = pos.coords.latitude;
  const lng = pos.coords.longitude;

  if (navigator.geolocation) {
    getReverseGeocoding(lat, lng);
  } else {
    console.log("Wrong coordinates");
  }
});

let getReverseGeocoding = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=868111882189345765018x2761`
  )
    .then((res) => res.json())
    .then((data) => {
      getWeather(data.city);
    });
};

const getWeather = async function (city) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4e72c938bc07a4f2c726e7ff3b73721e`
  );
  let data = await response.json();
  let dataCity = `${data.name}, ${data.sys.country}`;
  cityName.innerText = dataCity;
  let dataTemp = `${(data.main.temp - kelwinToCelsius).toFixed(1)}°C`;
  temperature.innerText = dataTemp;
  let dataDesc = data.weather[0].description.toUpperCase();
  description.innerText = dataDesc;
  wind.innerText = `Wind ${data.wind.speed} m/s`;
  pressure.innerText = `Pressure ${data.main.pressure} hPa`;
  humidity.innerText = `Humidity ${data.main.humidity}%`;
  cloudiness.innerText = `Cloudiness ${data.clouds.all}%`;
};
