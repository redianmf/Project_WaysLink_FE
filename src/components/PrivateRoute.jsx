import React, { useContext } from "react";

import { Route, Redirect } from "react-router-dom";
import { UserContext } from "../context/userContext";

// create component here
export default function PrivateRoute({ component: Component, ...rest }) {
  const [state, dispatch] = useContext(UserContext);
  //   const isLogin = state.isLogin;
  const isLogin = true;

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          isLogin ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    </>
  );
}
