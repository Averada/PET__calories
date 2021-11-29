export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    console.log(serializedState, 'HEYHEYEHEY');
    if (serializedState === null) {
      return {
        isSignedIn: false,
        userId: null,
        userName: null,
        userEmail: null,
        userProfileImg:"img-1621266213352.png",
      };
    }
    return JSON.parse(serializedState.auth);
  } catch (err) {
    return console.log("YA V OSHIBKE");
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("auth", serializedState);
  } catch (err) {}
};

export const saveStateInfo = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("info", serializedState);
  } catch (err) {}
};
