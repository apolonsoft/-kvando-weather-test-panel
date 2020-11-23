import React, {Suspense, lazy} from "react";
import {Redirect, Switch, Route} from "react-router-dom";
import {LayoutSplashScreen, ContentRoute} from "../custom_theme/layout";
import {DashboardPage} from "./pages/DashboardPage";


const WeatherPage = lazy(() =>
    import("./modules/Weather/pages/weatherPage")
);

export default function BasePage() {
    // useEffect(() => {
    //   console.log('Base page');
    // }, []) // [] - is required if you need only one call
    // https://reactjs.org/docs/hooks-reference.html#useeffect

    return (
        <Suspense fallback={<LayoutSplashScreen/>}>
            <Switch>
                {
                    /* Redirect from root URL to /dashboard. */
                    <Redirect exact from="/" to="/dashboard"/>
                }
                <ContentRoute path="/dashboard" component={DashboardPage}/>

                <Route path="/weather" component={WeatherPage}/>
                <Redirect to="error/error-v1"/>
            </Switch>
        </Suspense>
    );
}
