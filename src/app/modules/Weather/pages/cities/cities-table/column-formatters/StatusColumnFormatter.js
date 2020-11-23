import React from "react";
import {
  CityStatusCssClasses,
  CityStatusTitles
} from "../../CitiesUIHelpers";

export const StatusColumnFormatter = (cellContent, row) => (
  <span
    className={`label label-lg label-light-${
        CityStatusCssClasses[row.status]
    } label-inline`}
  >
    {CityStatusTitles[row.status]}
  </span>
);
