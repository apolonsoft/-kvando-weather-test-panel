import {createSlice} from "@reduxjs/toolkit";

const initialDashboardState = {
  listLoading: false,
  actionsLoading: false,
  currentLocation: undefined,
  cityWeather: undefined,
  lastError: null
};
export const callTypes = {
  list: "list",
  action: "action"
};

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialDashboardState,
  reducers: {
    catchError: (state, action) => {
      state.error = `${action.type}: ${action.payload.error}`;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = false;
      } else {
        state.actionsLoading = false;
      }
    },
    startCall: (state, action) => {
      state.error = null;
      if (action.payload.callType === callTypes.list) {
        state.listLoading = true;
      } else {
        state.actionsLoading = true;
      }
    },
    // getLocationByCoord
    locationFetched: (state, action) => {
      state.actionsLoading = false;
      state.currentLocation = action.payload.currentLocation;
      state.error = null;
    },
    weatherFetched: (state, action) => {
      state.actionsLoading = false;
      state.cityWeather = action.payload.cityWeather;
      state.error = null;
    },
  }
});
