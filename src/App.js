import React, { useContext, useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./context/userContext";

import { API, setAuthToken } from "../src/config/api";

import PrivateRoute from "./components/PrivateRoute";
import LandingPage from "./pages/LandingPage";
import Template from "./pages/Template";
import CreateLink from "./pages/CreateLink";
import EditLink from "./pages/EditLink";
import Profile from "./pages/Profile";
import MyLinks from "./pages/MyLinks";
import PreviewTemplate from "./pages/PreviewTemplate1";
import PageNotFound from "./pages/PageNotFound";
import PreviewTemplate1 from "./pages/PreviewTemplate1";
import PreviewTemplate2 from "./pages/PreviewTemplate2";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    if (state.isLogin === false) {
      history.push("/");
    } else {
      history.push("/template");
    }
  }, [state]);

  const checkUser = async () => {
    try {
      if (!localStorage.token) {
        return dispatch({
          type: "LOGOUT",
        });
      }

      const response = await API.get("/check-auth");
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "LOGOUT",
        });
      }

      // Get user data
      let payload = response.data.data.user;
      // Get token from local storage
      payload.token = localStorage.token;

      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />

      <PrivateRoute path="/template" component={Template} />
      <PrivateRoute path="/create-link/:id" component={CreateLink} />
      <PrivateRoute path="/edit-link/:id" component={EditLink} />
      <PrivateRoute path="/profile" component={Profile} />
      <PrivateRoute path="/my-links" component={MyLinks} />
      {/* <Route path="/preview-template" component={PreviewTemplate} /> */}
      <Route
        exact
        path="/:param1/:id"
        render={(props) => {
          if (props.match.params.param1 == "preview-template-1") {
            return <PreviewTemplate1 {...props} />;
          }
          if (props.match.params.param1 == "preview-template-2") {
            return <PreviewTemplate2 {...props} />;
          }
        }}
      />

      {/* <Route exact path="/modals" component={ModalSubscribeView} /> */}
      <Route exact path="*" component={PageNotFound} />
    </Switch>
  );
}

export default App;
