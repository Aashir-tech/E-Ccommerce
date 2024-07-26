import React from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom";
import Loader from "../layout/Loader/loader";

const ProtectedRoute = ({ element }) => {
  const { isLoading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  if (isLoading) return <Loader />;

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
