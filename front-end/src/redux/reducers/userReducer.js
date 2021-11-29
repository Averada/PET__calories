// import { SIGN_IN, SIGN_OUT, ADD_INFO, DEFAULT_SIGNIN } from "../types/authTypes";
// import { INITIAL_UPDATE } from "../types/foodTypes";
// import initState from "../initState";
// начало

// export default (state = [], action) => {
//   switch (action.type) {
//     case SIGN_IN:
//       return { ...state, isSignedIn: true, userId: action.payload };
//     // ...action.payload };
//     case SIGN_OUT:
//       return { ...state, isSignedIn: false, userId: null };
//     case ADD_INFO:
//       return {
//         ...state,
//         userName: action.payload.userName,
//         userEmail: action.payload.userEmail,
//       };
//     case INITIAL_UPDATE:
//       return {
//         ...state,
//         userName: action.payload.name,
//         userEmail: action.payload.email,
//         userId: action.payload._id,
//       };
//       case DEFAULT_SIGNIN:
//         return {
//           ...state,
//           userName: action.payload.userName,
//           userEmail: action.payload.userEmail,
//         };

//     default:
//       return state;
//   }
// // };
// import * as TYPES from "../types/types";

// export const signIn = (userId) => {
//   return {
//     type: TYPES.SIGN_IN,
//     payload: userId,
//   };
// };

// export const signOut = () => {
//   return {
//     type: TYPES.SIGN_OUT,
//   };
// };

// export const addInfo = (userInfo) => {
//   return {
//     type: TYPES.ADD_INFO,
//     payload: userInfo,
//   };
// };

// export const defaultSignIn = (userInfo) => {
//   return {
//     type: TYPES.DEFAULT_SIGNIN,
//     payload: userInfo,
//   };
// };
