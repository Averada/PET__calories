const router = require("express").Router();
const userModel = require("../models/userModel");
const mealModel = require("../models/mealModel");
const nutritionix = require("nutritionix-api");

router.post("/", async (req, res) => {
  const {id} = req.body
  const meals = await mealModel.find({ user: id });
  return res.json(meals);
});

router.post("/info", async (req, res) => {
  const {id} = req.body
  const user = await userModel.findById(id);
  console.log(user , '<------------------')
  return res.json(user);
});

router.post("/getInfo", async (req, res) => {
  const { text } = req.body;
  nutritionix.init("da8c820a", "565f0e552b1922526af40def174df0a1");

  nutritionix.natural.search(text).then((result) => {
    res.json(result.foods);
  });
});

router.post("/createMeal", async (req, res) => {
  try {
    const { items, id } = req.body;
    const myMeal = await mealModel.create({
      user: id,
      items,
    });
    res.json(myMeal);
  } catch (e) {
    res.sendStatus(400);
  }
});

router.post("/deleteMeal", async (req, res) => {
  console.log(req.body)
  try {
    const { id } = req.body;
    await mealModel.findByIdAndDelete(id);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(400);
  }
});

module.exports = router;
