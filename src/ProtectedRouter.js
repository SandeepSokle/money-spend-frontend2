import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { get_user_detail } from "./components/functions/user";
import { useDispatch } from "react-redux";
function Protected({ children }) {
  const location = useLocation();

  const token = window.localStorage.getItem("moneySpendsToken");
  const isSignedIn = token && token !== "" ? true : false;
  const dispatch = useDispatch();

  useEffect(() => {
    get_user_detail({ dispatch });
  }, [location]);

  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  // get_user_detail({ dispatch });
  return children;
}
export default Protected;
