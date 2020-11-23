import axios from "axios";

export const CITIES_URL = "api/cities";


// CREATE =>  POST: add a new city to the server
export function createCity(city) {
  return axios.post(CITIES_URL, { city });
}

// READ
export function getAllCities() {
  return axios.get(CITIES_URL);
}

export function getCityById(cityId) {
  return axios.get(`${CITIES_URL}/${cityId}`);
}

// Method from server should return QueryResultsModel(items: any[], totalsCount: number)
// items => filtered/sorted result
export function findCities(queryParams) {
  return axios.post(`${CITIES_URL}/find`, { queryParams });
}

// UPDATE => PUT: update the city on the server
export function updateCity(city) {
  return axios.put(`${CITIES_URL}/${city.id}`, { city });
}

// UPDATE Status
export function updateStatusForCities(ids, status) {
  return axios.post(`${CITIES_URL}/updateStatusForCities`, {
    ids,
    status
  });
}

// DELETE => delete the city from the server
export function deleteCity(cityId) {
  return axios.delete(`${CITIES_URL}/${cityId}`);
}

// DELETE Cities by ids
export function deleteCities(ids) {
  return axios.post(`${CITIES_URL}/deleteCities`, { ids });
}
