
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input, Select } from "../../../../../../custom_theme/_partials/controls";
import {
  AVAILABLE_COLORS,
  CityStatusTitles,
} from "../CitiesUIHelpers";

// Validation schema
const CityEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("City Name is required"),
  country: Yup.string()
    .min(2, "Minimum 2 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Country is required"),
  population: Yup.number()
    .min(1000, "1000 is minimum")
    .max(35000000, "35000000 is maximum")
    .required("Population is required"),
  color: Yup.string().required("Color is required"),
});

export function CityEditForm({
  city,
  btnRef,
  saveCity,
}) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={city}
        validationSchema={CityEditSchema}
        onSubmit={(values) => {
          saveCity(values);
        }}
      >
        {({ handleSubmit }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="name"
                    component={Input}
                    placeholder="Name"
                    label="Name"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                      name="country"
                      component={Input}
                      placeholder="Country"
                      label="Country"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    type="number"
                    name="population"
                    component={Input}
                    placeholder="Population"
                    label="City Population"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Select name="color" label="Color">
                    {AVAILABLE_COLORS.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-4">
                  <Select name="status" label="Status">
                    {CityStatusTitles.map((status, index) => (
                        <option key={status} value={index}>
                          {status}
                        </option>
                    ))}
                  </Select>
                </div>
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
