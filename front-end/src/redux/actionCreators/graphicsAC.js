import * as TYPES from "../types/types";


const getUsersThunk = (id) => async (dispatch, getState) => {
  const resp = await fetch("http://localhost:3000/logger", {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    body: JSON.stringify({ id: id }),
  });
  const res = await resp.json();
  dispatch(setWeek(res));
};

function setWeek(payload) {
  return {
    type: TYPES.SET_WEEK,
    payload: payload,
  };
}

const getUserInfo = (id) => async (dispatch, getState) => {
  const resp = await fetch("http://localhost:3000/logger/info", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: id }),
  });
  const res = await resp.json();
  dispatch({
    type: TYPES.USER_DATA_CHANGE,
    payload: { dbData: res },
  });
};

export { getUsersThunk, getUserInfo };

// update user details
export const personalInfoHandler =
  ({
    age,
    gender,
    weight,
    height,
    activity,
    id,
    bmi,
    targetWeight,
  }) =>
  async (dispatch, getState) => {
    const Proteins = targetWeight * 4 * 1.5;
    const carbohydrates = targetWeight * 9;
    const fats = targetWeight * 4 * 1.5;
    const kcal = Proteins + carbohydrates + fats;

    const data = {
      age,
      id,
      gender,
      weight,
      height,
      activity,
      bmi,
      Proteins,
      carbohydrates,
      fats,
      kcal,
      targetWeight,
    };

    console.log("data> ", data);

    const response = await fetch(`http://localhost:3000/profileData/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const dbData = await response.json();

    console.log("coming from back", dbData);

    return dispatch({
      type: TYPES.USER_DATA_CHANGE,
      payload: { dbData: dbData },
    });
  };

//upload Img
//
export const newPicChange = (newPicture) => (dispatch) => {
  dispatch(newPic(newPicture.file.path));
};

export const newPic = (data) => {
  return { type: TYPES.PIC_UPLOAD, payload: data };
};

//upload scann img
//
export const scanPicChange = (newPicture) => (dispatch) => {
  dispatch(scannAction(newPicture.file.path));
};

export const scannAction = (data) => {
  return { type: TYPES.SCANN_UPLOAD, payload: data };
};
