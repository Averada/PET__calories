import { useEffect, useRef, useState } from 'react';
import React from 'react';
import Item from '../Item/Item';
import RandomBurger from '../RandomBurger/RandomBurger';
import BounceLoader from 'react-spinners/BounceLoader';
import TableMeal from '../TableMeal/TableMeal';
import { scanPicChange } from '../../redux/actionCreators/graphicsAC';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import { getMeal } from '../../redux/actionCreators/mealAC';
import { changeTextSaga } from '../../redux/saga';
import * as TYPES from '../../redux/types/types';
import useStyles from './useStyles';
import {
  Box,
  Typography,
  Dialog,
  TextField,
  Tooltip,
  FormGroup,
  FormControl,
} from '@material-ui/core';
import {
  Button,
} from "reactstrap";
import style from './list.module.css';

function List() {
  const inputRef = useRef(null);
  const id = useSelector((state) => state.auth.userId);
  const options = useSelector((state) => state.food.options);
  const week = useSelector((state) => state.week);
  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [scan, setScan] = useState(false);
  const [text, setText] = useState(false);

  const classes = useStyles();

  function clickHandler() {
    setOpen((prev) => !prev);
    setText('');
    dispatch({
      type: TYPES.CHANGE_OPTIONS,
      payload: [],
    });
  }

  function tabClickHandler() {
    setScan((prev) => !prev);
  }

  useEffect(() => {
    if (text) {
      dispatch(changeTextSaga(text));
    }
  }, [text]);

  function changeText(e) {
    setText(e.target.value);
  }

  function createMeal(e) {
    dispatch(getMeal(options, id));
    setOpen((prev) => !prev);
    setText('');
    dispatch({
      type: TYPES.CHANGE_OPTIONS,
      payload: [],
    });
  }

  //upload scanned pic
  const uploadOnChange = async (e) => {
    e.preventDefault();
    const img = e.target.files[0];
    const data = new FormData();
    data.append('scan-pic', img);

    let response = await fetch(`http://localhost:3000/scannedUpload/${id}`, {
      method: 'POST',
      body: data,
    });
    response = await response.json();
    dispatch(scanPicChange(response));
  };

  return (
    <>
    
      <Box className={classes.button2}>
        <Tooltip title="Add meal" placement="bottom">
          <Button className={style.glow} onClick={clickHandler}>
            <Typography variant="button" style={{ fontWeight: 'bold' }}>
              Create meal
            </Typography>
          </Button>
        </Tooltip>
      </Box>

      <Box >
        <Dialog   open={open} >
          <FormControl style={{width:"480px" , padding: "16px 10px"}} >
            <Box>
              <Button onClick={tabClickHandler} type="button"  style={{ backgroundColor: '#427276', color:'white'}}>
                {!scan ? 'Search Recipe' : 'Search Meal'}
              </Button>
            </Box>
            <BounceLoader
              color="#A3526C"
              size={150}
              loading={loading}
              css={{
                zIndex: '100',
                position: 'absolute',
                margin: '30%',
                marginTop: '45%',
              }}
            />
            {!scan ? (
              <>
              <hr></hr>
                <Typography
                variant='h5'
                  style={{
                    color: 'rgb(35 74 78)',
                    padding: '6px 0px 10px 3px',
                  }}
                >
                  Search food:
                </Typography>
                  
                <FormGroup style={{ padding: '8px 25px' }}>
                  <TextField
                    required
                    id="outlined-required"
                    variant="outlined"
                    onChange={changeText}
                    placeholder="2 apples, 100 grams of rice, two cups of milk"
                    value={text ? text : ''}
                  />
                </FormGroup>
                <hr></hr>
                {options ? (
                  options.map((el) => (
                    <Item
                    key={uuidv4()}
                      num={el.num}
                      image={el.image}
                      Kcals={el.info.cal}
                      proteins={el.info.prot}
                      fats={el.info.fat}
                      carbs={el.info.carb}
                    />
                  ))
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <RandomBurger />
                <input
                  type="file"
                  id="fileUploader"
                  hidden="hidden"
                  ref={inputRef}
                  onChange={uploadOnChange}
                />
              </>
            )}
            <Box className={classes.box}>
            {scan ? (
              ''
            ) : (
              <>
              <Button
                type="button"
                onClick={createMeal}
                style={{ backgroundColor: '#427276' , marginRight: "12px" , color:'white'}}
              >
                Add Meal
              </Button>
              </>
            )}{' '}
            <Button
              type="button"
              onClick={clickHandler}
              style={{ backgroundColor: 'rgb(218 92 61)' , color:'white', width:"70px"}}
            >
              {!scan ? 'Cancel' : 'Exit'}
            </Button>
            </Box>
          </FormControl>
        </Dialog>
      </Box>
      <TableMeal week={week}></TableMeal>
    </>
  );
}

export default List;
