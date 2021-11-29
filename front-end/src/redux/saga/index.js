
import { put, call, debounce } from "redux-saga/effects";
import { changeOptions } from "../actionCreators/mealAC";
import * as TYPES from "../types/types";

async function fetchAddMeal(text) {
  if (text) {
    return await fetch(`http://localhost:3000/logger/getInfo`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        return resp.map((el) => {
          return {
            name: el.food_name,
            num: el.serving_qty,
            image: el.photo.thumb,
            info: {
              cal: el.nf_calories,
              fat: el.nf_total_fat,
              carb: el.nf_total_carbohydrate,
              prot: el.nf_protein,
            },
          };
        });
      });
  }
}

function changeTextSaga(payload) {
  return { type: TYPES.CHANGE_OPTIONS_SAGA, payload: payload };
}

function* workerAddMealLoad({ payload }) {
  yield put({ type: TYPES.CHANGE_LOAD, payload: { loading: true } });
  const options = yield call(fetchAddMeal, payload);
  yield put({ type: TYPES.CHANGE_LOAD, payload: { loading: false } });
  yield put(changeOptions(options));
}

export default function* watchAddLoad() {
  yield debounce(1000, TYPES.CHANGE_OPTIONS_SAGA, workerAddMealLoad);
}

export { changeTextSaga };
