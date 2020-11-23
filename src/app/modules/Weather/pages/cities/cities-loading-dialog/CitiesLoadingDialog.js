import React, {useEffect} from "react";
import {shallowEqual, useSelector} from "react-redux";
import {LoadingDialog} from "../../../../../../custom_theme/_partials/controls";

export function CitiesLoadingDialog() {
  const { isLoading } = useSelector(
    state => ({ isLoading: state.cities.listLoading }),
    shallowEqual
  );
  useEffect(() => {}, [isLoading]);
  return <LoadingDialog isLoading={isLoading} text="Loading ..." />;
}
