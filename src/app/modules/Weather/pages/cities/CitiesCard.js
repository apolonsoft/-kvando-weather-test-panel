import React, {useMemo} from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../custom_theme/_partials/controls";
import { CitiesFilter } from "./cities-filter/CitiesFilter";
import { CitiesTable } from "./cities-table/CitiesTable";
import { CitiesGrouping } from "./cities-grouping/CitiesGrouping";
import { useCitiesUIContext } from "./CitiesUIContext";

export function CitiesCard() {
  const citiesUIContext = useCitiesUIContext();
  const citiesUIProps = useMemo(() => {
    return {
      ids: citiesUIContext.ids,
      queryParams: citiesUIContext.queryParams,
      setQueryParams: citiesUIContext.setQueryParams,
      newCityButtonClick: citiesUIContext.newCityButtonClick,
      openDeleteCitiesDialog: citiesUIContext.openDeleteCitiesDialog,
      openEditCityPage: citiesUIContext.openEditCityPage,
      openUpdateCitiesStatusDialog:
        citiesUIContext.openUpdateCitiesStatusDialog,
      openFetchCitiesDialog: citiesUIContext.openFetchCitiesDialog,
    };
  }, [citiesUIContext]);

  return (
    <Card>
      <CardHeader title="Cities list">
        <CardHeaderToolbar>
          <button
            type="button"
            className="btn btn-primary"
            onClick={citiesUIProps.newCityButtonClick}
          >
            New City
          </button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <CitiesFilter />
        {citiesUIProps.ids.length > 0 && (
          <>
            <CitiesGrouping />
          </>
        )}
        <CitiesTable />
      </CardBody>
    </Card>
  );
}
