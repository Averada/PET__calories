import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as TYPES from "../../redux/types/types";
import useStyles from "./useStyles";

import {
  ResponsiveContainer,
  LineChart,
  XAxis,
  Tooltip,
  CartesianGrid,
  Line,
  YAxis,
  Bar,
  BarChart,
  Label,
} from "recharts";
import { getUsersThunk } from "../../redux/actionCreators/graphicsAC";
import { Typography, Box, Grid } from "@material-ui/core";

function Logger({ darkTheme }) {
  const week = useSelector((state) => state.week);
  const today = useSelector((state) => state.food.meals);
  const info = useSelector((state) => state.info);
  const id = useSelector((state) => state.auth.userId);

  const dispatch = useDispatch();
  let graphics_target;
  let graphics_need;
  let result;

  const classes = useStyles();

  useEffect(() => {
    dispatch(getUsersThunk(id));
  }, [today]);

  useEffect(() => {
    async function tmp() {
      const response = await fetch(`http://localhost:3000/logger/info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id }),
      });
      const data = await response.json();
      dispatch({ type: TYPES.USER_DATA_CHANGE, payload: { dbData: data } });
    }
    tmp();
  }, []);

  console.log(info, "YAINFO");
  let newArr = [];

  let todayGraph = {
    carbohydrates: 0,
    fats: 0,
    proteins: 0,

    Kcalories: 0,
  };

  graphics_need = {
    targetKCal: info.kcal,
    targetProt: info.Proteins,
    targetCarb: info.carbohydrates,
    targetFat: info.fats,
  };

  if (week.length) {
    let acc = {
      date: week[0].date,
      carbohydrates: 0,
      fats: 0,
      proteins: 0,
      Kcalories: 0,
    };
    week.forEach((el, i) => {
      let totalCarb = 0;
      let totalFat = 0;
      let totalProt = 0;
      let totalCal = 0;
      el.items.forEach((ele) => {
        const { carb, fat, prot, cal } = ele.info;
        totalCarb += carb;
        totalFat += fat;
        totalProt += prot;
        totalCal += cal;
      });

      if (
        new Date(acc.date).toLocaleDateString() !==
        new Date(el.date).toLocaleDateString()
      ) {
        newArr.push(acc);
        acc = {
          date: el.date,
          carbohydrates: totalCarb,
          fats: totalFat,
          proteins: totalProt,
          Kcalories: totalCal,
        };
      } else {
        acc = {
          ...acc,
          carbohydrates: acc.carbohydrates + totalCarb,
          fats: acc.fats + totalFat,
          proteins: acc.proteins + totalProt,
          Kcalories: acc.Kcalories + totalCal,
        };
      }
      if (i === week.length - 1) {
        newArr.push(acc);
      }
    });

    newArr = newArr.map((el) => {
      return {
        ...el,
        carbohydrates: el.carbohydrates.toFixed(2),
        fats: el.fats.toFixed(2),
        proteins: el.proteins.toFixed(2),
        Kcalories: el.Kcalories.toFixed(2),
      };
    });
    if (
      new Date(newArr[newArr.length - 1].date).toLocaleDateString() ===
      new Date().toLocaleDateString()
    ) {
      todayGraph = newArr[newArr.length - 1];
    }
  }

  graphics_target = newArr;

  result = [
    {
      ...todayGraph,
      ...graphics_need,
    },
  ];

  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
      height="78vh"
    >
      <Box className={classes.styleForContainer}>
        <Box className={classes.forBox1}>
          <Box className={classes.typolog}>
            <Typography
              style={{ color: !darkTheme ? "#34575B" : "rgb(154 152 152)" }}
              variant="h4"
            >
              Data:
            </Typography>
          </Box>
        {/* <ResponsiveContainer maxHeight="350px" maxWidth="550px"> */}

          <LineChart
            className={classes.graphics}
            width="80%"
            // width={550}
            height={350}
            data={graphics_target}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
          {/* </Grid> */}
          
            <CartesianGrid strokeDasharray="3 3" stroke="#999" />
            <XAxis dataKey="day">
              <Label position="insideBottom" />
            </XAxis>
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="Kcalories"
              stroke="#F17455"
              strokeWidth={4}
              />
            <Line
              type="monotone"
              dataKey="fats"
              stroke="#776E18"
              strokeWidth={2}
              />
            <Line
              type="monotone"
              dataKey="proteins"
              stroke="#A3526C"
              strokeWidth={2}
              />
            <Line
              type="monotone"
              dataKey="carbohydrates"
              stroke="#EEC458"
              strokeWidth={2}
              />
          </LineChart>
              {/* </ResponsiveContainer> */}
        </Box>
        <Box className={classes.legend}>
          <Typography variant="body1" component={"div"}>
            <Box
              className={classes.text}
              style={{ color: "#F17455", opacity: 0.65 }}
            >
              ◆ Kcalories
            </Box>
            <Box className={classes.text} style={{ color: "#F17455" }}>
              ◆ Target Kcalories
            </Box>
            <br></br>
            <Box
              className={classes.text}
              style={{ color: "#A3526C", opacity: 0.65 }}
            >
              ◆ Proteins
            </Box>
            <Box className={classes.text} style={{ color: "#A3526C" }}>
              ◆ Target Proteins
            </Box>
            <br></br>
            <Box
              className={classes.text}
              style={{ color: "#DFA616", opacity: 0.65 }}
            >
              ◆ Carbs
            </Box>
            <Box className={classes.text} style={{ color: "#DFA616" }}>
              ◆ Target Carbs
            </Box>
            <br></br>
            <Box
              className={classes.text}
              style={{ color: "#776E18", opacity: 0.65 }}
            >
              ◆ Fats
            </Box>
            <Box className={classes.text} style={{ color: "#776E18" }}>
              ◆ Target Fats
            </Box>
          </Typography>
        </Box>
        <Box>
          <Box className={classes.typolog2}>
            <Typography
              variant="h4"
              style={{ color: !darkTheme ? "#34575B" : "rgb(154 152 152)" }}
            >
              Today:
            </Typography>
          </Box>

          <BarChart
            width={600}
            height={350}
            data={result}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            barCategoryGap="10%"
            barGap="10"
          >
            <XAxis dataKey="day">
              <Label position="insideBottom" />
            </XAxis>
            <YAxis />
            <Tooltip />
            <CartesianGrid stroke="#999" />

            <Bar
              dataKey="Kcalories"
              barSize={40}
              fill="#F17455"
              opacity="0.65"
            />
            <Bar
              dataKey="targetKCal"
              barSize={40}
              fill="#F17455"
              isAnimationActive={false}
            ></Bar>

            <Bar
              dataKey="proteins"
              barSize={40}
              fill="#A3526C"
              opacity="0.65"
            ></Bar>
            <Bar
              dataKey="targetProt"
              barSize={40}
              fill="#A3526C"
              isAnimationActive={false}
            ></Bar>

            <Bar
              dataKey="carbohydrates"
              barSize={40}
              fill="#DFA616"
              opacity="0.65"
            />
            <Bar
              dataKey="targetCarb"
              barSize={40}
              fill="#DFA616"
              isAnimationActive={false}
            ></Bar>

            <Bar dataKey="fats" barSize={40} fill="#776E18" opacity="0.65" />
            <Bar
              dataKey="targetFat"
              barSize={40}
              fill="#776E18"
              isAnimationActive={false}
            ></Bar>
          </BarChart>
        </Box>
      </Box>
    </Grid>
  );
}

export default Logger;
