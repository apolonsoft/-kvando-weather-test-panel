import React, { useEffect, useMemo } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import * as actions from "../../../_redux/cities/citiesActions";
import * as uiHelpers from "../CitiesUIHelpers";
import {
  getSelectRow,
  getHandlerTableChange,
  NoRecordsFoundMessage,
  PleaseWaitMessage,
  sortCaret,
} from "../../../../../../custom_theme/_helpers";
import * as columnFormatters from "./column-formatters";
import { Pagination } from "../../../../../../custom_theme/_partials/controls";
import { useCitiesUIContext } from "../CitiesUIContext";

export function CitiesTable() {

  const citiesUIContext = useCitiesUIContext();
  const citiesUIProps = useMemo(() => {
    return {
      ids: citiesUIContext.ids,
      setIds: citiesUIContext.setIds,
      queryParams: citiesUIContext.queryParams,
      setQueryParams: citiesUIContext.setQueryParams,
      openEditCityPage: citiesUIContext.openEditCityPage,
      openDeleteCityDialog: citiesUIContext.openDeleteCityDialog,
    };
  }, [citiesUIContext]);

  // Getting curret state of cities list from store (Redux)
  const { currentState } = useSelector(
    (state) => ({ currentState: state.cities }),
    shallowEqual
  );
  const { totalCount, entities, listLoading } = currentState;
  // Cities Redux state
  const dispatch = useDispatch();
  useEffect(() => {
    // clear selections list
    citiesUIProps.setIds([]);
    // server call by queryParams
    dispatch(actions.fetchCities(citiesUIProps.queryParams));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesUIProps.queryParams, dispatch]);
  // Table columns
  const columns = [
    {
      dataField: "id",
      text: "ID",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "name",
      text: "Name",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "country",
      text: "Country",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "population",
      text: "Population",
      sort: true,
      sortCaret: sortCaret,
    },
    {
      dataField: "color",
      text: "Color",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.ColorColumnFormatter,
    },
    {
      dataField: "status",
      text: "Status",
      sort: true,
      sortCaret: sortCaret,
      formatter: columnFormatters.StatusColumnFormatter,
    },
    {
      dataField: "action",
      text: "Actions",
      formatter: columnFormatters.ActionsColumnFormatter,
      formatExtraData: {
        openEditCityPage: citiesUIProps.openEditCityPage,
        openDeleteCityDialog: citiesUIProps.openDeleteCityDialog,
      },
      classes: "text-right pr-0",
      headerClasses: "text-right pr-3",
      style: {
        minWidth: "100px",
      },
    },
  ];
  // Table pagination properties
  const paginationOptions = {
    custom: true,
    totalSize: totalCount,
    sizePerPageList: uiHelpers.sizePerPageList,
    sizePerPage: citiesUIProps.queryParams.pageSize,
    page: citiesUIProps.queryParams.pageNumber,
  };
  return (
    <>{entities &&(
      <PaginationProvider pagination={paginationFactory(paginationOptions)}>
        {({ paginationProps, paginationTableProps }) => {
          return (
            <Pagination
              isLoading={listLoading}
              paginationProps={paginationProps}
            >
              <BootstrapTable
                wrapperClasses="table-responsive"
                classes="table table-head-custom table-vertical-center overflow-hidden"
                bootstrap4
                bordered={false}
                remote
                keyField="id"
                data={entities === null ? [] : entities}
                columns={columns}
                defaultSorted={uiHelpers.defaultSorted}
                onTableChange={getHandlerTableChange(
                  citiesUIProps.setQueryParams
                )}
                selectRow={getSelectRow({
                  entities,
                  ids: citiesUIProps.ids,
                  setIds: citiesUIProps.setIds,
                })}
                {...paginationTableProps}
              >
                <PleaseWaitMessage entities={entities} />
                <NoRecordsFoundMessage entities={entities} />
              </BootstrapTable>
            </Pagination>
          );
        }}
      </PaginationProvider>)}
    </>
  );
}
