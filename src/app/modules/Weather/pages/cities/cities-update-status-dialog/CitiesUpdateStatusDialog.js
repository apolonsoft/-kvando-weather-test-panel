import React, { useEffect, useState, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CityStatusCssClasses } from "../CitiesUIHelpers";
import * as actions from "../../../_redux/cities/citiesActions";
import { useCitiesUIContext } from "../CitiesUIContext";

const selectedCities = (entities, ids) => {
  const _cities = [];
  ids.forEach((id) => {
    const city = entities.find((el) => el.id === id);
    if (city) {
      _cities.push(city);
    }
  });
  return _cities;
};

export function CitiesUpdateStatusDialog({ show, onHide }) {
  // Cities UI Context
  const citiesUIContext = useCitiesUIContext();
  const citiesUIProps = useMemo(() => {
    return {
      ids: citiesUIContext.ids,
      setIds: citiesUIContext.setIds,
      queryParams: citiesUIContext.queryParams,
    };
  }, [citiesUIContext]);

  // Cities Redux state
  const { cities, isLoading } = useSelector(
    (state) => ({
      cities: selectedCities(state.cities.entities, citiesUIProps.ids),
      isLoading: state.cities.actionsLoading,
    }),
    shallowEqual
  );

  // if there weren't selected cities we should close modal
  useEffect(() => {
    if (citiesUIProps.ids || citiesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesUIProps.ids]);

  const [status, setStatus] = useState(0);

  const dispatch = useDispatch();
  const updateStatus = () => {
    // server request for updateing city by ids
    dispatch(actions.updateCitiesStatus(citiesUIProps.ids, status)).then(
      () => {
        // refresh list after deletion
        dispatch(actions.fetchCities(citiesUIProps.queryParams)).then(
          () => {
            // clear selections list
            citiesUIProps.setIds([]);
            // closing delete modal
            onHide();
          }
        );
      }
    );
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Status has been updated for selected cities
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {isLoading && (
          <div className="overlay-layer bg-transparent">
            <div className="spinner spinner-lg spinner-warning" />
          </div>
        )}
        <div className="list-timeline list-timeline-skin-light padding-30">
          <div className="list-timeline-items">
            {cities.map((city) => (
              <div className="list-timeline-item mb-3" key={city.id}>
                <span className="list-timeline-text">
                  <span
                    className={`label label-lg label-light-${
                      CityStatusCssClasses[city.status]
                    } label-inline`}
                    style={{ width: "60px" }}
                  >
                    ID: {city.id}
                  </span>{" "}
                  <span className="ml-5">
                    {city.manufacture}, {city.model}
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <select
            className={`form-control ${CityStatusCssClasses[status]}`}
            value={status}
            onChange={(e) => setStatus(+e.target.value)}
          >
            <option value="0">Selling</option>
            <option value="1">Sold</option>
          </select>
        </div>
        <div className="form-group">
          <button
            type="button"
            onClick={onHide}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <> </>
          <button
            type="button"
            onClick={updateStatus}
            className="btn btn-primary btn-elevate"
          >
            Update Status
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
