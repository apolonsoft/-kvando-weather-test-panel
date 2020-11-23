import React, {useEffect} from "react";
import {shallowEqual, useDispatch, useSelector} from "react-redux";
import {geolocated, geoPropTypes} from "react-geolocated";
import * as dashboardActions from "./../../../app/modules/Weather/_redux/dashboard/dashboardActions";


const getDirection = (degrees, isLongitude) =>
    degrees > 0 ? (isLongitude ? "E" : "N") : isLongitude ? "W" : "S";

const formatDegrees = (degrees, isLongitude) =>
    `${0 | degrees}° ${
        0 | (((degrees < 0 ? (degrees = -degrees) : degrees) % 1) * 60)
    }' ${0 | (((degrees * 60) % 1) * 60)}" ${getDirection(
        degrees,
        isLongitude,
    )}`;

const Location = (props) => {

    const {currentState} = useSelector(
        (state) => ({currentState: state.dashboard}),
        shallowEqual
    );

    const {currentLocation, cityWeather, actionsLoading} = currentState;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(dashboardActions.fetchCurrentLocation(props.coords));
    }, [props.coords, dispatch]);

    useEffect(() => {
        if (currentLocation) {
            dispatch(dashboardActions.fetchCityWeather(currentLocation.text));
        }
    }, [currentLocation]);

    return (<div
            style={{
                fontSize: "large",
                fontWeight: "bold",
                margin: "2rem",
            }}
        >
            {!props.isGeolocationAvailable ? (
                <div>Your browser does not support Geolocation.</div>
            ) : !props.isGeolocationEnabled ? (
                <div>Geolocation is not enabled.</div>
            ) : props.coords ? (
                <div>
                    You are at{" "}
                    <span className="coordinate">
                    {formatDegrees(props.coords.latitude, false)}
                </span>
                    ,{" "}
                    <span className="coordinate">
                    {formatDegrees(props.coords.longitude, true)}
                </span>
                    ,{"      "}
                    <span className="coordinate">
                    {currentLocation ? currentLocation.text : ""}
                    </span>
                    ,{"      "}
                    <span className="coordinate">
                    {cityWeather && cityWeather.length > 0 ? `${cityWeather[0].main} ${cityWeather[0].description}`  : ""}
                    </span>
                    {props.coords.altitude ? (
                        <span>
                        , approximately {props.coords.altitude} meters above sea
                        level
                    </span>
                    ) : null}
                    .
                </div>
            ) : (
                <div>Getting the location data&hellip;</div>
            )}
            {!!props.positionError && (
                <div>
                    <br/>
                    Last position error:
                    <pre>{JSON.stringify(props.positionError)}</pre>
                </div>
            )}
        </div>
    )
};

Location.propTypes = {...Location.propTypes, ...geoPropTypes};

export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
})(Location);
