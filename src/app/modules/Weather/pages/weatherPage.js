import React, { Suspense } from "react";
import { Redirect, Switch } from "react-router-dom";
import { CitiesPage } from "./cities/CitiesPage";
import { CityEdit } from "./cities/city-edit/CityEdit";
import { LayoutSplashScreen, ContentRoute } from "../../../../custom_theme/layout";

export default function weatherPage() {
  return (
    <Suspense fallback={<LayoutSplashScreen />}>
      <Switch>
        {
          <Redirect
            exact={true}
            from="/weather"
            to="/weather/cities"
          />
        }
        <ContentRoute path="/weather/cities/new" component={CityEdit} />
        <ContentRoute
          path="/weather/cities/:id/edit"
          component={CityEdit}
        />

        <ContentRoute path="/weather/cities" component={CitiesPage} />
      </Switch>
    </Suspense>
  );
}
