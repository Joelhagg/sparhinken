// import { Route, Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "./contexts/AuthContext";

// const PrivateRoute = ({ compnent: Component, ...rest }: any) => {
//   const { currentUser } = useAuth();

//   return currentUser ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

import { Route, Navigate, Outlet } from "react-router-dom";
import { StateContext } from "./contexts/StateProvider/StateProvider";
import { useContext } from "react";

const PrivateRoute = ({ compnent: Component, ...rest }: any) => {
  const contextState = useContext(StateContext);

  return contextState.currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
