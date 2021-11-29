import React, { useState, useEffect } from "react";
import {  useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import ProfileModal from "../ProfileModal/ProfileModal";
import {AppBar,Toolbar,Typography,IconButton,FormGroup,Switch,FormControlLabel,Box,Dialog} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

import useStyles from './useStyles'
import styles from "./header.module.css";



function Header({ darkTheme, setDarkTheme }) {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const userName = useSelector((state) => state.auth.userName);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();
  const goToWelcomePage = () => history.push("/");
  useEffect(() => {
    if (!isSignedIn) {
      goToWelcomePage();
    }
  }, [isSignedIn]);

  function openProfile() {
    setOpen((prev) => !prev);
  }
  const handleClose = () => {
    setOpen(false);
  };
  return (

    <AppBar position="static" className={classes.colorPrimary}>
      <Toolbar variant="dense" className={classes.root}>
        <Typography variant="h6" color="inherit">
          {darkTheme ? (
            <img
              src="blackLogo.png"
              className={styles.Logo}
              alt='logo'
            ></img>
          ) : (
            <img
              src="coloredLogo.png"
              className={styles.Logo}
              alt='colorLogo'
            ></img>
          )}

        </Typography>
        <Box className={classes.linkStyle}>

          {userName ? "" : <Typography variant='h4'> 
                {/* ППП */}
              </Typography>}

          {userName ? (
            <>
              <Typography className={classes.logger} variant='h4'> 
                <Link to='/logger'>LOGGER</Link>
              </Typography>
            </>
          ) : (
            <>

            </>
          )}
        </Box>
        <Box
          className={classes.changeTheme}
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  onClick={() => setDarkTheme(!darkTheme)}
                  aria-label='login switch'
                />
              }
            />
          </FormGroup>
          {!userName ? (
            ""
          ) : (
            <>
              <IconButton

                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={openProfile}
                placeholder="Profile"
              ></IconButton>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"

                onClick={openProfile}
              >
                <MenuIcon
                  style={{ color: "white" }}
                ></MenuIcon>
              </IconButton>
              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"

                className={classes.modal}
              >
                <ProfileModal setOpen={setOpen} />
              </Dialog>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
