const mongoCollections = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const dailyData = mongoCollections.dailyData;

//databases
// {
//     "_id": "12eg456-e89b-24d3-a456-426655440000",
//     "dailyCases ": "151234",
//     "dailyDeath": "6757",
//     "dailyVaccination": "6757",
//     "dailyRecover": "5678",
//     "sum_of_cases": "6666",
//     "sum_of_death": "4573",
//     "sum_of_vaccination": "7592",
//     "sum_of_recover": "7824",
//     "change_date ": "04/03/2021"
// }