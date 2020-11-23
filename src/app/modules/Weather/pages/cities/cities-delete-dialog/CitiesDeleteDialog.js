/* eslint-disable no-restricted-imports */
import React, { useEffect, useMemo } from "react";
import { Modal } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ModalProgressBar } from "../../../../../../custom_theme/_partials/controls";
import * as actions from "../../../_redux/cities/citiesActions";
import { useCitiesUIContext } from "../CitiesUIContext";

export function CitiesDeleteDialog({ show, onHide }) {
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
  const dispatch = useDispatch();
  const { isLoading } = useSelector(
    (state) => ({ isLoading: state.cities.actionsLoading }),
    shallowEqual
  );

  // looking for loading/dispatch
  useEffect(() => {}, [isLoading, dispatch]);

  // if there weren't selected cities we should close modal
  useEffect(() => {
    if (!citiesUIProps.ids || citiesUIProps.ids.length === 0) {
      onHide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [citiesUIProps.ids]);

  const deleteCities = () => {
    // server request for deleting city by seleted ids
    dispatch(actions.deleteCities(citiesUIProps.ids)).then(() => {
      // refresh list after deletion
      dispatch(actions.fetchCities(citiesUIProps.queryParams)).then(() => {
        // clear selections list
        citiesUIProps.setIds([]);
        // closing delete modal
        onHide();
      });
    });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      {isLoading && <ModalProgressBar />}
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Cities Delete
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {!isLoading && (
          <span>Are you sure to permanently delete selected cities?</span>
        )}
        {isLoading && <span>Cities are deleting...</span>}
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
            onClick={deleteCities}
            className="btn btn-primary btn-elevate"
          >
            Delete
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
