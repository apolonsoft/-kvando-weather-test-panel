import React, { createContext, useContext, useState, useCallback } from "react";
import { isEqual, isFunction } from "lodash";
import { initialFilter } from "./CitiesUIHelpers";

const CitiesUIContext = createContext();

export function useCitiesUIContext() {
  return useContext(CitiesUIContext);
}

export const CitiesUIConsumer = CitiesUIContext.Consumer;

export function CitiesUIProvider({ citiesUIEvents, children }) {
  const [queryParams, setQueryParamsBase] = useState(initialFilter);
  const [ids, setIds] = useState([]);
  const setQueryParams = useCallback((nextQueryParams) => {
    setQueryParamsBase((prevQueryParams) => {
      if (isFunction(nextQueryParams)) {
        nextQueryParams = nextQueryParams(prevQueryParams);
      }

      if (isEqual(prevQueryParams, nextQueryParams)) {
        return prevQueryParams;
      }

      return nextQueryParams;
    });
  }, []);

  const value = {
    queryParams,
    setQueryParamsBase,
    ids,
    setIds,
    setQueryParams,
    newCityButtonClick: citiesUIEvents.newCityButtonClick,
    openEditCityPage: citiesUIEvents.openEditCityPage,
    openDeleteCityDialog: citiesUIEvents.openDeleteCityDialog,
    openDeleteCitiesDialog: citiesUIEvents.openDeleteCitiesDialog,
    openFetchCitiesDialog: citiesUIEvents.openFetchCitiesDialog,
    openUpdateCitiesStatusDialog:
      citiesUIEvents.openUpdateCitiesStatusDialog,
  };

  return (
    <CitiesUIContext.Provider value={value}>
      {children}
    </CitiesUIContext.Provider>
  );
}
