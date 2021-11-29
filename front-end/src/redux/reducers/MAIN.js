import * as TYPES from "../types/types";

const mainReducer = (state = [], action) => {
  console.log("heyyyyyyy", action.payload);
  switch (action.type) {
    case TYPES.ADD_TOLOCALSTORAGE:
      return { ...state, auth: action.payload };
    case TYPES.CHANGE_LOAD:
      return {
        ...state,
        ...action.payload,
      };
    case TYPES.USER_DATA_CHANGE:
      return {
        ...state,
        auth: {
          ...state.auth,
          userId: action.payload.dbData._id,
        },
        info: {
          ...state.info,
          ...action.payload.dbData.info,
        },
      };
    case TYPES.CHANGE_OPTIONS:
      return {
        ...state,
        food: { ...state.food, options: action.payload },
      };
    case TYPES.ADD_MEAL:
      return {
        ...state,
        food: { ...state.food, meals: [...state.food.meals, action.payload] },
      };
    case TYPES.DELETE_MEAL:
      return {
        ...state,
        food: {
          ...state.food,
          meals: state.food.meals.filter((el) => el.date !== action.payload),
        },
      };
    case TYPES.SET_WEEK:
      return {
        ...state,
        week: action.payload,
      };
    case TYPES.SIGN_IN:
      return {
        ...state,
        auth: {
          ...state.auth,
          isSignedIn: true,
          userName: action.payload.userName,
          userId: action.payload.userId,
          userEmail: action.payload.userEmail,
        },
      };
    case TYPES.GET_GGLID:
      return {
        ...state,
        auth: {
          ...state.auth,
          userId: action.payload.userId,
        },
      };
    case TYPES.SIGN_OUT:
      return {
        ...state,
        info: {
          age: "",
          gender: "",
          weight: "",
          height: "",
          activity: "",
          bmi: "",
          targetWeight: null,
          kcal: null,
          Proteins: null,
          carbohydrates: null,
          fats: null,
        },
        auth: {
          ...state.auth,
          userName: null,
          userEmail: null,
          isSignedIn: false,
          userId: null,
          userProfileImg: {},
        },
      };
    case TYPES.ADD_INFO:
      return {
        ...state,
        auth: {
          ...state.auth,
          isSignedIn: true,
          userName: action.payload.userName,
          userEmail: action.payload.userEmail,
          userId: action.payload.userId,
        },
      };
    case TYPES.DEFAULT_SIGNIN:
      return {
        ...state,
        auth: {
          userName: action.payload.userName,
          userEmail: action.payload.userEmail,
        },
      };
    case TYPES.PIC_UPLOAD:
      return {
        ...state,
        auth: { ...state.auth, userProfileImg: action.payload },
      };
    case TYPES.SCANN_UPLOAD:
      return {
        ...state,
        food: {
          ...state.food,
          scannedImg: action.payload,
        },
      };

    default:
      return state;
  }
};

export default mainReducer;

export const signIn = (userId) => {
  return {
    type: TYPES.SIGN_IN,
    payload: userId,
  };
};

export const googleId = (userId) => {
  return {
    type: TYPES.GET_GGLID,
    payload: userId,
  };
};

export const signOut = () => {
  return {
    type: TYPES.SIGN_OUT,
  };
};

export const addInfo = (userInfo) => {
  return {
    type: TYPES.ADD_INFO,
    payload: userInfo,
  };
};

export const defaultSignIn = (userInfo) => {
  return {
    type: TYPES.DEFAULT_SIGNIN,
    payload: userInfo,
  };
};

export const pushIntoLocalStorage = (userInfo) => {
  return {
    type: TYPES.ADD_TOLOCALSTORAGE,
    payload: userInfo,
  };
};
