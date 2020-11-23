import React, {useMemo} from "react";
import objectPath from "object-path";
import {useHtmlClassService} from "../../layout";
import {WeatherDashboard} from "./WeatherDashboard";


export function Dashboard() {
    const uiService = useHtmlClassService();
    const layoutProps = useMemo(() => {
        return {
            dashboard: objectPath.get(
                uiService.config,
                "dashboard"
            )};
    }, [uiService]);
    return <>
        {layoutProps.dashboard === 'weather' && <WeatherDashboard />}
    </>;
}
