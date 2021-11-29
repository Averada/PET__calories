import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Recipe from './Recipe';
import Axios from 'axios';
import { Button, Container, Form } from 'reactstrap';
import { Input } from '@material-ui/core';

const RandomBurger = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('');

  const APP_ID = '4e9f05eb';
  const APP_KEY = '9b904d703fa0d46a88ce1ac63f29f498';

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== '') {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert('No food with such name');
      }
      console.log(result.data.hits);
      setRecipes(result.data.hits);
      setQuery('');
      setAlert('');
    } else {
      setAlert('Please fill the form');
    }
  };

  const onChange = (e) => setQuery(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  };

  return (
    <>
    <hr></hr>
      <Form onSubmit={onSubmit}  >
        <div style={{display: "flex" , justifyContent:'center'}}>
          <Input
            type="text"
            name="query"
            onChange={onChange}
            value={query}
            autoComplete="off"
            placeholder="Search Food"
          />
          <Button style={{ backgroundColor:'#427276'}}>Search</Button>
        </div>
          <hr></hr>
      </Form>
      <Container>
        <div className="recipes">
          {recipes
            ? recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)
            : ''}
        </div>
      </Container>
    </>
  );
};

export default RandomBurger;
