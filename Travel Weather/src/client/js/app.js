const Axios = require("axios"); //it's better to use it instead of fetch
// Declare the constants
const geonamesURL = "http://api.geonames.org/searchJSON?maxRows=1&q=";
const geonamesUsername = "sanagarah";
const pixabayURL = "https://pixabay.com/api/?key=";
const pixabayKey = "17433333-d75b2a1ffb88a26c0e53a5a34";
const weatherbitURL = "https://api.weatherbit.io/v2.0/forecast/daily?";
const weatherbitKey = "5ce6da18263649c4b6797ed957e4e765";
const tempreture = document.querySelector("#temp");
const image = document.querySelector("#img");
const click = document.querySelector("#click");
const cityTo = document.querySelector("#to");
const del = document.querySelector("#delete");
const text1 = document.querySelector("#text1");
const text2 = document.querySelector("#text2");
const to = document.querySelector("#city");
const date = document.querySelector("#date");

// get lat and long from the city name
export const getCity = async (url, to, username) => {
  const res = await fetch(`${url}${to}&username=${username}`);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// get weather details from lat and long
export const getWeather = async (lat, lng) => {
  const req = await fetch(
    `${weatherbitURL}&lat=${lat}&lon=${lng}&key=${weatherbitKey}`
  );
  try {
    const weather = await req.json();
    return weather;
  } catch (error) {
    console.log("error", error);
  }
};

//post to server
export const postData = async (url, data) => {
  const req = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      city: data.city,
      date: data.dayDate,
      weather: data.weather,
      lat: data.lat,
    }),
  });
  try {
    const data = await req.json();
    return data;
  } catch (error) {
    console.log("error", error);
  }
};

// get pixabay image to update the UI
export const PImage = async (data) => {
  const c = data.city;
  const res = await fetch(
    `${pixabayURL}${pixabayKey}&q=${c}&city&image_type=photo`
  );

  try {
    const photo = await res.json();

    image.setAttribute("src", photo.hits[0].largeImageURL);
    to.innerHTML = data.city;
    text1.innerHTML = data.date;
    tempreture.innerHTML = data.weather;
    text2.innerHTML = data.lat;
  } catch (error) {
    console.log("error", error);
  }
};

// insert a trip
export const insert = () => {
  const city = cityTo.value;
  const dayDate = date.value;

  getCity(geonamesURL, city, geonamesUsername)
    .then((city) => {
      const lat = city.geonames[0].lat;
      const lng = city.geonames[0].lng;
      const weather = getWeather(lat, lng);
      return weather;
    })
    .then((weather) => {
      const data = postData("http://localhost:8000/travel", {
        city,
        dayDate,
        weather: weather.data[0].temp,
        lat: weather.lat,
      });
      return data;
    })
    .then((data) => {
      PImage(data);
    });
};

// event listener when button clicked
const listen = click.addEventListener("click", insert);
export { listen };

function removeSection() {
  image.src = "";
  temp.innerHTML = "The temperature";
  to.innerHTML = "The city";
  text1.innerHTML = "The date";
  text2.innerHTML = "City latitude";
}

del.addEventListener("click", removeSection);
