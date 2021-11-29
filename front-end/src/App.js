import Header from "./components/Header/Header";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PageNotFound from "./components/404/404";
import Logger from "./components/Logger/Logger";
import styles from "./app.module.css";
import List from "./components/List/List";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import EditProfile from "./pages/EditProfile/EditProfile";
import Footer from "./components/Footer/Footer";
import { useSelector } from "react-redux";
import PrivateRouter from "./components/PrivateRouter/PrivateRouter";

function App() {
  const [darkTheme, setDarkTheme] = useState(false);

  const loading = useSelector((state) => state.loading);

  return (
    <>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            opacity: 0.6,
            zIndex: 100,
          }}
        ></div>
      ) : (
        <></>
      )}
      <BrowserRouter>
        <div className={darkTheme ? styles.dark : styles.light}>
          <Header darkTheme={darkTheme} setDarkTheme={setDarkTheme} />
          <Switch>
            <Route exact path="/" component={WelcomePage} />
            <PrivateRouter exact path="/edit">
              <EditProfile />
            </PrivateRouter>
            <PrivateRouter exact path="/logger">
              <Logger darkTheme={darkTheme}/>
              <List />
            </PrivateRouter>
            <Route component={PageNotFound}>
            </Route>
          </Switch>
          <Footer></Footer>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
