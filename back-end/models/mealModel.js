const { Schema, model } = require("mongoose");

const mealSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "userModel",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  items: [
    {
      name: String,
      num: Number,
      image: String,
      ScannedImg: { type: Schema.Types.ObjectId, ref: "Img", default: null },
      info: {
        cal: Number,
        fat: Number,
        carb: Number,
        prot: Number,
      },
    },
  ],
});

const mealModel = model("Meal", mealSchema);

module.exports = mealModel;
