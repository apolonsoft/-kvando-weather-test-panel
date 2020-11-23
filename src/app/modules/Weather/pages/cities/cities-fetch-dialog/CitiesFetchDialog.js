import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useSelector } from "react-redux";
import { CityStatusCssClasses } from "../CitiesUIHelpers";
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

export function CitiesFetchDialog({ show, onHide }) {
  // Cities UI Context
  const citiesUIContext = useCitiesUIContext();
  const citiesUIProps = useMemo(() => {
    return {
      ids: citiesUIContext.ids,
      queryParams: citiesUIContext.queryParams,
    };
  }, [citiesUIContext]);

  // Cities Redux state
  const { cities } = useSelector(
    (state) => ({
      cities: selectedCities(state.cities.entities, citiesUIProps.ids),
    }),
    shallowEqual
  );

  // if there weren't selected ids we should close modal
  useEffect(() => {
    if (!citiesUIProps.ids || citiesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesUIProps.ids]);

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Fetch selected elements
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
      <Modal.Footer>
        <div>
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
            onClick={onHide}
            className="btn btn-primary btn-elevate"
          >
            Ok
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
