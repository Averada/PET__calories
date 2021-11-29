import {
  Button,
  
  FormControlLabel,
  FormLabel,
  Icon,
  Radio,
  RadioGroup,

  TextField,
} from "@material-ui/core";
import {  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { personalInfoHandler } from "../../redux/actionCreators/graphicsAC";

const EditProfile = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //form handler
  const setInputDetailsHandler = (e) => {
    e.preventDefault();
    dispatch(
      personalInfoHandler({
        age,
        gender,
        weight,
        height,
        activity,
        id,
        bmi,
        targetWeight,
      })
    );
    history.push("/logger");
  };

  // use selectors
  const userName = useSelector((state) => state.auth.userName);
  const id = useSelector((state) => state.auth.userId);
  const stateAge = useSelector((state) => state.info.age);
  const stateWeight = useSelector((state) => state.info.weight);
  const stateHeight = useSelector((state) => state.info.height);
  const stateTargetWeight = useSelector((state) => state.info.targetWeight);
  const stateGender = useSelector((state) => state.info.gender);
  const stateActivity = useSelector((state) => state.info.activity);

  //use States
  const [age, setAge] = useState(stateAge);
  const [gender, setGender] = useState(stateGender);
  const [weight, setWeight] = useState(stateWeight);
  const [height, setHeight] = useState(stateHeight);
  const [activity, setActivity] = useState(stateActivity);
  const [bmi, setBmi] = useState("");
  const [targetWeight, setTargetWeight] = useState(stateTargetWeight);



  // on change input
  const changeInputHandler = async (e) => {
    let input = e.target.value;
    // console.log(input);
    // console.log(e.target);
    switch (e.target.className) {
      case "PrivateSwitchBase-input-15":
        setGender(input);
        console.log(e.target);
        break;

      case "form-select":
        if (input !== "Choose your activity") {
          setActivity(input);
          console.log(input);
        }
        break;

      default:
        break;
    }
    switch (e.target.id) {
      case "gender":
        setGender(input);
        console.log(e.target);
        break;
      case "age":
        setAge(input);
        console.log(e.target);

        break;
      case "weight":
        setWeight(input);

        break;
      case "height":
        setHeight(input);
        console.log(height);
        break;
      case "activity":
        setActivity(input);
        break;

      case "weightTarget":
        setTargetWeight(input);
        break;
      default:
        break;
    }
    //calculate bmi
    await setBmi((prev) => {
      let activeBmi;
      switch (activity) {
        case "sedentary":
          activeBmi = 1.01;
          break;
        case "light":
          activeBmi = 1.007;
          break;
        case "moderate":
          activeBmi = 1.004;
          break;
        case "extraActive":
          activeBmi = 1.001;
          break;
        default:
          activeBmi = 1;
          break;
      }

      let ageBmi;
      if (Number(age) <= 20) {
        ageBmi = 1.002;
      } else if (Number(age) <= 40 && Number(age) > 20) {
        ageBmi = 1.008;
      } else {
        ageBmi = 1.012;
      }

      let genderBmi;
      switch (gender) {
        case "man":
          genderBmi = 0.99;
          break;
        case "woman":
          genderBmi = 1.01;
          break;
        default:
          genderBmi = 1;
          break;
      }

      return Number(
        (weight / (0.0001 * height * height)) * activeBmi * ageBmi * genderBmi
      ).toFixed(2);
    });
  };

  return (
    <>

      <h2> {userName},</h2>
      <span>Please insert all your details here!</span>
      <br />
      <br />

      <FormLabel component="legend">Gender</FormLabel>
      <RadioGroup
        aria-label="gender"
        id="gender"
        name="gender1"
        onChange={changeInputHandler}
        className="gender"
      >
        <FormControlLabel value="woman" control={<Radio />} label="woman" />
        <FormControlLabel value="man" control={<Radio />} label="man" />
      </RadioGroup>
      <TextField
        value={age}
        id="age"
        label="Age"
        type="number"
        className="age"
        datatype="age"
        onChange={changeInputHandler}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        value={weight}
        id="weight"
        label="Weight"
        datatype="weight"
        type="number"
        className="weight"
        onChange={changeInputHandler}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        value={height}
        id="height"
        label="Height"
        datatype={"height"}
        type="number"
        className="height"
        onChange={changeInputHandler}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        value={targetWeight}
        id="weightTarget"
        label="Weight target"
        type="number"
        datatype={"weightTarget"}
        className="weightTarget"
        onChange={changeInputHandler}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <select
        defaultValue={activity}
        className="form-select"
        onChange={changeInputHandler}
        // defaultValue={"Default select example"}
      >
        <option value="Default select example" disabled>Choose your activity</option>
        <option className="form-select" value="sedentary">
          Sedentary: little to no oxercise
        </option>
        <option value="light">Light: 1-3 times/week</option>
        <option value="moderate">Moderate: 4-5 times/week</option>
        <option value="extraActive">
          Extra Active: very intense exercise daily
        </option>
      </select>
      <Button
        variant="contained"
        color="primary"
        endIcon={<Icon>add_circle</Icon>}
        style={{ margin: "25px" }}
        onClick={setInputDetailsHandler}
      >
        Add
      </Button>
      <Button variant="contained" color="primary" style={{ margin: "25px" }}>
        Cancel
      </Button>
    </>
  );
};

export default EditProfile;
