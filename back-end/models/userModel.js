const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: String,
  email: String,
  password: String,
  img: [{ type: Schema.Types.ObjectId, ref: "Img" }],
  info: {
    age: String,
    gender: String,
    weight: String,
    height: String,
    activity: String,
    bmi: String,
    targetWeight: String,
    kcal: Number,
    Proteins: Number,
    carbohydrates: Number,
    fats: Number,
  },
});

const userModel = model("User", userSchema);

module.exports = userModel;
