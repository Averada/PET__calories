import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CardImg, Button } from 'reactstrap';
import { getMeal } from '../../redux/actionCreators/mealAC';
import RecipeDetails from './RecipeDetails';

const Recipe = ({ recipe }) => {
  const dispatch = useDispatch();
  const { label, image, url, digest, calories } = recipe.recipe;
  const id = useSelector((state) => state.auth.userId);

  console.log(recipe);

  const addMeal = async () => {
    const myMeal = [
      {
        name: label,
        num: 1,
        image: image,
        info: {
          prot: digest[1].total,
          cal: calories / 9,
          carb: digest[1].total,
          fat: digest[0].total,
        },
      },
    ];
    dispatch(getMeal(myMeal, id));
  };

  return (

    <div className="recipe" style={{ paddingTop: '27px', display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h4 style={{color:"rgb(35 74 78)" , padding: "6px 0px 10px 3px"}}>{label}</h4>
        <a href={url} target="_blank" rel="noopener noreferrer">
        <CardImg style={{ width: '40%' }} src={image} alt={label} />
          </a>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', paddingTop: "9px" }}>
        <Button style={{backgroundColor: "#88445A", }} type="button" onClick={addMeal} >
          Add meal
        </Button>
          <RecipeDetails  ingredients={digest} calories={calories} />
      </div>
    </div>
  );
};


export default Recipe;
