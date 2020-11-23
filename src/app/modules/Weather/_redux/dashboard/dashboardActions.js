import * as requestFromServer from "./dashboardCrud";
import {dashboardSlice, callTypes} from "./dashboardSlice";

const {actions} = dashboardSlice;

export const fetchCurrentLocation = coords => dispatch => {
  if (!coords) {
    return dispatch(actions.locationFetched({ currentLocation: undefined }));
  }
  dispatch(actions.startCall({ callType: callTypes.action }));
  return requestFromServer
    .getLocationByCoord(coords)
    .then(response => {
      console.log(response)
      const city = response.data?.features[0];
      dispatch(actions.locationFetched({ currentLocation: city }));
    })
    .catch(error => {
      console.log(error)
      error.clientMessage = "Can't find location";
      dispatch(actions.catchError({ error, callType: callTypes.action }));
    });
};

export const fetchCityWeather = cityName => dispatch => {
    if (!cityName) {
        return dispatch(actions.weatherFetched({ cityWeather: undefined }));
    }

    dispatch(actions.startCall({ callType: callTypes.action }));
    return requestFromServer
        .getCityWeather(cityName)
        .then(response => {
            console.log(response)
            const weather = response.data.weather;
            dispatch(actions.weatherFetched({ cityWeather: weather }));
        })
        .catch(error => {
            error.clientMessage = "Can't get city weather";
            dispatch(actions.catchError({ error, callType: callTypes.action }));
        });
};

export const resetCityWeather = () => dispatch => {
    return dispatch(actions.weatherFetched({ cityWeather: undefined }));
};



