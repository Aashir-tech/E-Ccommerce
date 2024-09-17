import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation} from "react-router-dom";
import Loader from "../layout/Loader/loader";

const ProtectedRoute = ({ element }) => {
  const { isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const location = useLocation();


  if (isLoading) return <Loader />;
  
  return isAuthenticated ? (
    element
  ) : (
    <Navigate to={`/login?redirect=${location.pathname}`} />
  );
};

export default ProtectedRoute;
