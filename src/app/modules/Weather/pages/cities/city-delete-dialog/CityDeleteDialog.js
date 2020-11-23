/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../custom_theme/_partials/controls";
import * as actions from "../../../_redux/cities/citiesActions";
import { useCitiesUIContext } from "../CitiesUIContext";

export function CityDeleteDialog({ id, show, onHide }) {
  // Cities UI Context
  const citiesUIContext = useCitiesUIContext();
  const citiesUIProps = useMemo(() => {
    return {
      setIds: citiesUIContext.setIds,
      queryParams: citiesUIContext.queryParams,
    };
  }, [citiesUIContext]);

  // Cities Redux state
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cities.actionsLoading }),
    shallowEqual
  );

  // if !id we should close modal
  useEffect(() => {
    if (!id) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  const deleteCity = () => {
    // server request for deleting city by id
    dispatch(actions.deleteCity(id)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCities(citiesUIProps.queryParams));
      // clear selections list
      citiesUIProps.setIds([]);
      // closing delete modal
      onHide();
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar variant="query" />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          City Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete this city?</span>
        )}
        {isLoading && <span>City is deleting...</span>}
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
            onClick={deleteCity}
            className="btn btn-delete btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
