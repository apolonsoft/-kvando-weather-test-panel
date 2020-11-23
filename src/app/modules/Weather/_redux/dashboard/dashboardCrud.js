import axios from "axios";
const WEATHER_API_URL = "https://cors-anywhere.herokuapp.com/https://api.openweathermap.org";
const MAP_API_URL="https://api.mapbox.com/geocoding/v5/mapbox.places";
export function getLocationByCoord(coords) {
  return axios.get(
      `${MAP_API_URL}/${coords.longitude},${coords.latitude}.json?types=place&access_token=${process.env.REACT_APP_MAP_API_KEY}`);
}

export function getCityWeather(cityName) {
  return  axios.get(
      `${WEATHER_API_URL}/data/2.5/weather?q=${cityName}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`
  );
}
