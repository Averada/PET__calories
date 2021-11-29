import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { newPicChange } from "../../redux/actionCreators/graphicsAC";
import * as AuthorizationAction from "../../redux/reducers/MAIN";
import React from "react";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import useStyles from './useStyles'
import { Box, Icon, Typography } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
const ProfileModal = ({ setOpen }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const userName = useSelector((state) => state.auth.userName);
  const userEmail = useSelector((state) => state.auth.userEmail);
  const userTarget = useSelector((state) => state.info.targetWeight);
  const userKcal = useSelector((state) => state.info.kcal);
  const userProteins = useSelector((state) => state.info.Proteins);
  const userCarbohydrates = useSelector((state) => state.info.carbohydrates);
  const userFats = useSelector((state) => state.info.fats);
  const id = useSelector((state) => state.auth.userId);
  const userProfileImg = useSelector((state) => state.auth.userProfileImg);
  const inputRef = useRef(null);
  const onSignOutClick = () => {
    dispatch(AuthorizationAction.signOut());
    setOpen((prev) => !prev);
    localStorage.removeItem("info")
  };
  const goToEdit = () => {
    history.push("/edit");
    setOpen((prev) => !prev);
  };
  
  const classes = useStyles();

  //upload pic
  const uploadOnChange = async (e) => {
    e.preventDefault();
    const img = e.target.files[0];
    const data = new FormData();
    console.log({ img });
    data.append("photo", img);

    let response = await fetch(`http://localhost:3000/picUpload/${id}`, {
      method: "POST",
      body: data,
    });
    response = await response.json();
    console.log(response);
    dispatch(newPicChange(response));
  };
  const picHandler = () => {
    inputRef.current.click();
  };
  return (
    <Box className={classes.box}>
      <h4>Profile</h4>
      {/* <DialogTitle>Profile</DialogTitle> */}
      <Box p={2} className={classes.container}>
        <Avatar
          alt='Remy Sharp'
          src={"/img/" + userProfileImg}
          className={classes.avatar}
        />
        <input
          accept='image/*'
          className={classes.input}
          id='contained-button-file'
          multiple
          type='file'
        />
        <label htmlFor='icon-button-file'>
          <IconButton
            aria-label='upload picture'
            component='span'
            onClick={picHandler}
          >
            <PhotoCamera />
          </IconButton>
        </label>
      </Box>
      <Box
        component='span'
        display='flex'
        flexDirection='row'
        alignItems='center'
      >
        Name:
        <Typography className={classes.classForText} variant='subtitle2'>
          {userName}
        </Typography>
      </Box>
      <Box
        component='span'
        display='flex'
        flexDirection='row'
        alignItems='center'
      >
        Email:
        <Typography className={classes.classForText} variant='subtitle2'>
          {userEmail}
        </Typography>
      </Box>
      <Box
        component='span'
        display='flex'
        flexDirection='row'
        alignItems='center'
      >
        Weigth:
        <Typography className={classes.classForText} variant='subtitle2'>
          {userTarget} kg
        </Typography>{" "}
      </Box>
      <br />
      <h5>Daily intake</h5>
      <Box
        component='span'
        display='flex'
        flexDirection='row'
        alignItems='center'
      >
        kCal:
        <Typography className={classes.classForText} variant='subtitle2'>
          {userKcal}
        </Typography>
      </Box>
      <Box
        component='span'
        display='flex'
        flexDirection='row'
        alignItems='center'
      >
        Proteins:
        <Typography className={classes.classForText} variant='subtitle2'>
          {userProteins} g
        </Typography>
      </Box>

      <Box
        component='span'
        display='flex'
        flexDirection='row'
        alignItems='center'
      >
        Fats:
        <Typography className={classes.classForText} variant='subtitle2'>
          {userFats} g
        </Typography>
      </Box>

      <Box
        component='span'
        display='flex'
        flexDirection='row'
        alignItems='center'
      >
        Carbs:
        <Typography className={classes.classForText} variant='subtitle2'>
          {userCarbohydrates} g
        </Typography>
      </Box>
      <Button
        variant='contained'
        endIcon={<Icon>editIcon</Icon>}
        onClick={goToEdit}
      >
        Change profile
      </Button>
      <hr></hr>
      <Button variant='contained' onClick={onSignOutClick}>
        LogOut
      </Button>

      <input
        type='file'
        id='fileUploader'
        hidden='hidden'
        ref={inputRef}
        onChange={uploadOnChange}
      />
      {/* <IconButton onClick={picHandler} className='button'>
        <EditIcon />
      </IconButton> */}
    </Box>
  );
};

export default ProfileModal;
