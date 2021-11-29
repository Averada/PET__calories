import * as TYPES from "../types/types";

function addMeal(payload) {
  return { type: TYPES.ADD_MEAL, payload: payload };
}

function changeOptions(payload) {
  return { type: TYPES.CHANGE_OPTIONS, payload: payload };
}

export const getMeal = (items, id) => async (dispatch, getState) => {
  const response = await fetch("http://localhost:3000/logger/createMeal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items, id }),
  });
  const resp = await response.json();
  if (resp) {
    dispatch(addMeal(resp));
  }
};

function deleteMeal(payload) {
  return { type: TYPES.DELETE_MEAL, payload: payload };
}

export const sendMeal = (id) => async (dispatch, getState) => {
  const response = await fetch("http://localhost:3000/logger/deleteMeal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: id }),
  });
  if (response.status === 200) {
    dispatch(deleteMeal(id));
  }
};

export { changeOptions };
