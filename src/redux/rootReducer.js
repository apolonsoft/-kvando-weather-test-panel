import {all} from "redux-saga/effects";
import {combineReducers} from "redux";

import * as auth from "../app/modules/Auth/_redux/authRedux";

import {citiesSlice} from "../app/modules/Weather/_redux/cities/citiesSlice";
import {dashboardSlice} from "../app/modules/Weather/_redux/dashboard/dashboardSlice";

export const rootReducer = combineReducers({
  auth: auth.reducer,
  dashboard: dashboardSlice.reducer,
  cities: citiesSlice.reducer,
});

export function* rootSaga() {
  yield all([auth.saga()]);
}
