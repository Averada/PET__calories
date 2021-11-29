const { connect, connection } = require("mongoose");
const userModel = require('../models/userModel');
const mealModel = require('../models/mealModel')
const faker = require('faker');

async function main() {
  await connect('mongodb://localhost:27017/PPP', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });
    const users = [];
    for (let i = 0; i < 5; i += 1) {
      users.push(new userModel({
        name: faker.name.firstName(),
        email: faker.internet.email(),
        info:
        {
        age: faker.datatype.number(),
        gender:faker.datatype.number(),
        weight: faker.datatype.number(),
        height:faker.datatype.number(),
        activity:faker.datatype.number(),
        bmi: faker.datatype.number(),
        },
        target : 
        {
        targetWeigth:faker.datatype.number(),
        targetKcal: faker.datatype.number(),
        targetProteins:faker.datatype.number(),
        targetCarbohydrates: faker.datatype.number(),
        targetFats:faker.datatype.number()
        }
      }));
    }
    // const meal = [];
    // for (let i = 0; i < 5; i += 1) {
    //   meal.push(new mealModel({
    //       date:faker.datatype.number(),
    //       items:[faker.lorem.words()],
    //       info: {
    //         totalKcal:faker.datatype.number(),
    //         totalProteins:faker.datatype.number(),
    //         totalCarbohydrates:faker.datatype.number(),
    //         totalFats:faker.datatype.number(),
    //       }
    //   }));
    // }
    // await mealModel.insertMany(meal);
    await userModel.insertMany(users);
    await connection.close();
  
}
  main()
