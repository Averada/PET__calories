const initState = {
  info: localStorage.getItem("info")
    ? JSON.parse(localStorage.getItem("info"))
    : {
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

  food: {
    options: [],
    meals: [],
    scannedImg: null,
  },
  auth: localStorage.getItem("auth")
    ? JSON.parse(localStorage.getItem("auth"))
    : {
        isSignedIn: false,
        userId: null,
        userName: null,
        userEmail: null,
        userProfileImg: "img-1621266213352.png",
      },
  week: [],
  loading: false,
};

export default initState;
