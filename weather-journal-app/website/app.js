/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const key = "&appid=338015a8e435d2940bf326c5afa13410&units=imperial";

const Uzip = document.getElementById("zip");
const Udate = document.getElementById("date");
const Utemp = document.getElementById("temp");
const feel = document.getElementById("feelings");
const Ucontent = document.getElementById("content");
const generate = document.getElementById("generate");

// Fetch from OpenWeatherMap
const getData = async (baseURL, zip, appid) => {
  const response = await fetch(baseURL + zip + appid);
  try {
    let jsonResponse = await response.json();
    return jsonResponse;
  } catch {
    console.log("error");
  }
};

//  Post data into Server
const postData = async (link, data = {}) => {
  const response = await fetch(link, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    body: JSON.stringify(data),
  });
};

// Update UI
const updateUI = async () => {
  //Get data from Server
  const response = await fetch("http://localhost:8000/all");
  const jsn = await response.json();
  Udate.innerHTML = "The Date:" + jsn.date;
  Utemp.innerHTML = "The Temperature:" + jsn.temperature;
  Ucontent.innerHTML = "Your feeling:" + jsn.userResponse;
};

const click = async () => {
  const weatherData = await getData(baseURL, Uzip.value, key);

  let userDate = new Date();
  const data = {
    temperature: weatherData.main.temp,

    date:
      userDate.getDate() +
      "/" +
      userDate.getMonth() +
      "/" +
      userDate.getFullYear(),

    userresponse: feel.value,
  };
  await postData("http://localhost:8000", data);
  updateUI();
};

// Add listener
generate.addEventListener("click", click);
