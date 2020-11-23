import React from "react";
import { Route } from "react-router-dom";
import { CitiesLoadingDialog } from "./cities-loading-dialog/CitiesLoadingDialog";
import { CityDeleteDialog } from "./city-delete-dialog/CityDeleteDialog";
import { CitiesDeleteDialog } from "./cities-delete-dialog/CitiesDeleteDialog";
import { CitiesFetchDialog } from "./cities-fetch-dialog/CitiesFetchDialog";
import { CitiesUpdateStatusDialog } from "./cities-update-status-dialog/CitiesUpdateStatusDialog";
import { CitiesCard } from "./CitiesCard";
import { CitiesUIProvider } from "./CitiesUIContext";

export function CitiesPage({ history }) {
  const citiesUIEvents = {
    newCityButtonClick: () => {
      history.push("/weather/cities/new");
    },
    openEditCityPage: (id) => {
      history.push(`/weather/cities/${id}/edit`);
    },
    openDeleteCityDialog: (id) => {
      history.push(`/weather/cities/${id}/delete`);
    },
    openDeleteCitiesDialog: () => {
      history.push(`/weather/cities/deleteCities`);
    },
    openFetchCityDialog: () => {
      history.push(`/weather/cities/fetch`);
    },
    openUpdateCityStatusDialog: () => {
      history.push("/weather/cities/updateStatus");
    },
  };

  return (
    <CitiesUIProvider citiesUIEvents={citiesUIEvents}>
      <CitiesLoadingDialog />
      <Route path="/weather/cities/deleteCities">
        {({ history, match }) => (
          <CitiesDeleteDialog
            show={match != null}
            onHide={() => {
              history.push("/weather/cities");
            }}
          />
        )}
      </Route>
      <Route path="/weather/cities/:id/delete">
        {({ history, match }) => (
          <CityDeleteDialog
            show={match != null}
            id={match && match.params.id}
            onHide={() => {
              history.push("/weather/cities");
            }}
          />
        )}
      </Route>
      <Route path="/weather/cities/fetch">
        {({ history, match }) => (
          <CitiesFetchDialog
            show={match != null}
            onHide={() => {
              history.push("/weather/cities");
            }}
          />
        )}
      </Route>
      <Route path="/weather/cities/updateStatus">
        {({ history, match }) => (
          <CitiesUpdateStatusDialog
            show={match != null}
            onHide={() => {
              history.push("/weather/cities");
            }}
          />
        )}
      </Route>
      <CitiesCard />
    </CitiesUIProvider>
  );
}
