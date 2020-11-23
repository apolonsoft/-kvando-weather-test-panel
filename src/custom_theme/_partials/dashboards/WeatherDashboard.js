import React, {useRef} from "react";
import Location from "./Location";
export function WeatherDashboard() {
    const innerRef = useRef();

    const getLocation = () => {
        innerRef.current && innerRef.current.getLocation();
    };
    return (<>
            <div className="row">
                <Location onError={(error) => console.log(error)} ref={innerRef} />
                <button
                    className="btn btn-primary btn-elevate"
                    onClick={getLocation}
                    type="button"
                >
                    Get location
                </button>
            </div>
            <div className="row">

            </div>
    </>);
}
