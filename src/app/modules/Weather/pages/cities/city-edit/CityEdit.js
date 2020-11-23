/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import React, {useEffect, useState, useRef} from "react";
import {useDispatch, shallowEqual, useSelector} from "react-redux";
import * as actions from "../../../_redux/cities/citiesActions";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../../../../custom_theme/_partials/controls";
import {CityEditForm} from "./CityEditForm";
import {useSubheader} from "../../../../../../custom_theme/layout";
import {ModalProgressBar} from "../../../../../../custom_theme/_partials/controls";
import * as dashboardActions from "./../../../_redux/dashboard/dashboardActions";


const initCity = {
    id: undefined,
    name: "",
    country: "",
    population: 0,
    color: "Red",
    status: 0,
};

export function CityEdit({
                             history,
                             match: {
                                 params: {id},
                             },
                         }) {
    // Subheader
    const suhbeader = useSubheader();

    // Tabs
    const [tab, setTab] = useState("basic");
    const [title, setTitle] = useState("");
    const [weather, setWeather] = useState("");

    const dispatch = useDispatch();

    const {cityWeather} = useSelector(
        (state) => ({cityWeather: state.dashboard.cityWeather}),
        shallowEqual
    );

    // const layoutDispatch = useContext(LayoutContext.Dispatch);
    const {actionsLoading, cityForEdit} = useSelector(
        (state) => ({
            actionsLoading: state.cities.actionsLoading,
            cityForEdit: state.cities.cityForEdit,
        }),
        shallowEqual
    );


    useEffect(() => {
        dispatch(actions.fetchCity(id));
    }, [id, dispatch]);

    useEffect(() => {
        dispatch(dashboardActions.resetCityWeather());
        let _title = id ? "" : "New City";
        if (cityForEdit && id) {
            _title = `Edit city '${cityForEdit.name} ${cityForEdit.country}'`;
            dispatch(dashboardActions.fetchCityWeather(cityForEdit.name));
        }

        setTitle(_title);
        suhbeader.setTitle(_title);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cityForEdit, id]);

    useEffect(() => {
        const _weather = cityWeather && cityWeather.length > 0 ? ` Weather : ${cityWeather[0].main} ${cityWeather[0].description}` : "Weather is Loading..."

        setWeather(_weather)

    }, [cityWeather]);

    const saveCity = (values) => {
        if (!id) {
            dispatch(actions.createCity(values)).then(() => backToCitiesList());
        } else {
            dispatch(actions.updateCity(values)).then(() => backToCitiesList());
        }
    };

    const btnRef = useRef();
    const saveCityClick = () => {
        if (btnRef && btnRef.current) {
            btnRef.current.click();
        }
    };

    const backToCitiesList = () => {
        history.push(`/weather/cities`);
    };

    return (
        <Card>
            {actionsLoading && <ModalProgressBar/>}
            <CardHeader title={`${title} ${weather}`}>
                <CardHeaderToolbar>
                    <button
                        type="button"
                        onClick={backToCitiesList}
                        className="btn btn-light"
                    >
                        <i className="fa fa-arrow-left"></i>
                        Back
                    </button>
                    {`  `}
                    <button className="btn btn-light ml-2">
                        <i className="fa fa-redo"></i>
                        Reset
                    </button>
                    {`  `}
                    <button
                        type="submit"
                        className="btn btn-primary ml-2"
                        onClick={saveCityClick}
                    >
                        Save
                    </button>
                </CardHeaderToolbar>
            </CardHeader>
            <CardBody>
                <ul className="nav nav-tabs nav-tabs-line " role="tablist">
                    <li className="nav-item" onClick={() => setTab("basic")}>
                        <a
                            className={`nav-link ${tab === "basic" && "active"}`}
                            data-toggle="tab"
                            role="tab"
                            aria-selected={(tab === "basic").toString()}
                        >
                            Basic info
                        </a>
                    </li>
                </ul>
                <div className="mt-5">
                    {tab === "basic" && (
                        <CityEditForm
                            actionsLoading={actionsLoading}
                            city={cityForEdit || initCity}
                            btnRef={btnRef}
                            saveCity={saveCity}
                        />
                    )}
                </div>
            </CardBody>
        </Card>
    );
}
