import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import * as AuthorizationAction from "../../redux/reducers/MAIN"; // стало
import Button from "@material-ui/core/Button";
import { Container, FormGroup, Icon, TextField } from "@material-ui/core";
import Carusel from "../Carusel/Carusel";
import validate from "../../helpers/WelcomePageHelper";

const WelcomePage = () => {
  const dispatch = useDispatch();

  const fats = useSelector((state) => state.info.fats);
  const userName = useSelector((state) => state.auth.userName);

  const [inputPass, setInputPass] = useState("");
  const [inputMail, setInputMail] = useState("");
  const [inputName, setInputName] = useState("");
  const [auth, setAuth] = useState(null);
  const [test, setTest] = useState(true);

  const history = useHistory();
  const goToProf = () => {
    history.push("/edit");
  };
  const goToLogger = () => {
    history.push("/logger");
  };

  useEffect(() => {
    const params = {
      clientId:
        "463369379597-u90ubo7t61e08n9m80pmisgrmfh5g9gn.apps.googleusercontent.com",
      scope: "email",
    };
    window.gapi.load("client:auth2", () => {
      window.gapi.client.init(params).then(() => {
        setAuth(window.gapi.auth2.getAuthInstance());
        onAuthChange(window.gapi.auth2.getAuthInstance().isSignedIn.get());
        window.gapi.auth2.getAuthInstance().isSignedIn.listen(onAuthChange);
      });
    });
  }, []);

  const inputPassHandler = (e) => {
    setInputPass(e.target.value);
  };

  const inputMailHandler = (e) => {
    setInputMail(e.target.value);
  };

  const inputNameHandler = (e) => {
    setInputName(e.target.value);
  };

  const addNewUser = (userEmail, userPass, userName) => {
    fetch("http://localhost:3000/user/signupcheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPass,
        name: userName,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        response
          ? dispatch(
              AuthorizationAction.addInfo({
                userName: inputName.trim(),
                userEmail: inputMail.trim(),
                userId: response,
              })
            )
          : window.alert("This email already exists");
      });
  };

  const submitHandler1 = (e) => {
    e.preventDefault();
    if (inputPass.trim() && inputMail.trim() && inputName.trim()) {
      if (validate(inputMail.trim())) {
        addNewUser(inputMail.trim(), inputPass.trim(), inputName.trim());
      }
    } else window.alert("Fill in form fields and try again");
  };

  const signInCheck = (userEmail, userPass) => {
    fetch("http://localhost:3000/user/signincheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPass,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        response
          ? dispatch(
              AuthorizationAction.addInfo({
                userName: response.userName,
                userEmail: inputMail.trim(),
                userId: response.userId,
              })
            )
          : window.alert("Incorrect email or password");
      });
  };

  const submitHandler2 = (e) => {
    e.preventDefault();
    if (inputPass.trim() && inputMail.trim()) {
      signInCheck(inputMail.trim(), inputPass.trim());
    } else window.alert("Fill in form fields and try again");
  };

  const googleAuth = async () => {
    await auth.signIn();

    let userEmail = auth.currentUser.fe.Ft.pu;
    let userName = auth.currentUser.fe.Ft.Ue;
    fetch("http://localhost:3000/user/googleAuth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userEmail,
        name: userName,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        response
          ? dispatch(
              AuthorizationAction.addInfo({
                userName: userName,
                userEmail: userEmail,
                userId: response,
              })
            )
          : window.alert("Something went wrong");
      });
  };

  useEffect(() => {
    if (userName && fats) {
      goToProf();
    } else if (userName && !fats) goToLogger();
  }, [userName]);

  const onAuthChange = () => {
    dispatch(
      AuthorizationAction.googleId(
        window.gapi.auth2.getAuthInstance().currentUser.get().getId()
      )
    );
  };

  const onSignInClick = () => {
    googleAuth();
  };

  const changeTest = () => {
    setTest(!test);
  };

  return (
    <div
      style={{
        margin: "15px 150px",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "34px 38px",
        }}
      >
        <h2>{!test ? "Please Sign In" : "Please Sign Up"}</h2>
        {test ? (
          <>
            <FormGroup
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // alignItems: "center",
                background: "white",
                width: "500px",
                opacity: "0.7",
                borderRadius: "5px",
              }}
            >
              <TextField
                label="Email"
                variant="outlined"
                placeholder="Type email here..."
                onChange={inputMailHandler}
                value={inputMail}
                type="email"
                id="email"
                name="email"
                required
                style={{ width: "400px", padding: "15px 0 15px 0" }}
              />
              <TextField
                label="password"
                type="password"
                variant="outlined"
                placeholder="Type password here..."
                onChange={inputPassHandler}
                value={inputPass}
                required
                style={{ width: "400px", padding: "15px 0 15px 0" }}
              />
              <TextField
                label="Name"
                variant="outlined"
                placeholder="Name and second name here..."
                onChange={inputNameHandler}
                value={inputName}
                type="text"
                required
                style={{ width: "400px", padding: "15px 0 15px 0" }}
              />
              <div style={{ display: "flex", justifyItems: "center" }}>
                <div style={{ paddingTop: "9px", paddingLeft: "9px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                    onClick={submitHandler1}
                  >
                    Sign Up
                  </Button>
                </div>
                <div style={{ paddingLeft: "16px" }}>
                  Already have an account?
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={changeTest}
                    style={{ margin: "10px" }}
                  >
                    Sign In
                  </Button>
                </div>
              </div>
              <div style={{ alignItems: "center", display: "flex" }}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<Icon>fingerprint</Icon>}
                  onClick={onSignInClick}
                  style={{ margin: "25px" }}
                >
                  Sign In with Google
                </Button>
              </div>
            </FormGroup>
          </>
        ) : (
          <>
            <FormGroup
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "white",
                width: "500px",
                opacity: "0.7",
                borderRadius: "5px",
              }}
            >
              <TextField
                label="Email"
                variant="outlined"
                placeholder="Type email here..."
                onChange={inputMailHandler}
                value={inputMail}
                type="email"
                id="email"
                name="email"
                required
                style={{ width: "400px", padding: "15px 0 15px 0" }}
              />
              <TextField
                label="password"
                type="password"
                variant="outlined"
                placeholder="Type password here..."
                onChange={inputPassHandler}
                value={inputPass}
                required
                style={{ width: "400px", padding: "15px 0 15px 0" }}
              />

              <div
                style={{
                  display: "flex",
                  justifyItems: "center",
                  padding: "0 22px",
                }}
              >
                <div style={{ paddingTop: "9px", paddingLeft: "9px" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    endIcon={<Icon>send</Icon>}
                    onClick={submitHandler2}
                  >
                    Sign In
                  </Button>
                </div>
                <div style={{ paddingLeft: "16px" }}>
                  Not registered yet?
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={changeTest}
                    style={{ margin: "10px" }}
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
              <div style={{ alignItems: "center", display: "flex" }}>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<Icon>fingerprint</Icon>}
                  onClick={onSignInClick}
                  style={{ margin: "25px" }}
                >
                  Sign In with Google
                </Button>
              </div>
            </FormGroup>
          </>
        )}
      </Container>
      <hr></hr>
      <div width="400px" height="300px">
        <Carusel></Carusel>
      </div>
    </div>
  );
};

export default WelcomePage;
