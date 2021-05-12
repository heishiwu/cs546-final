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

async function getDataById(dataId){
    if (!dataId) throw 'dataId must be provided';
    if (typeof dataId != 'string' || !dataId.trim()) throw 'the input dataId is invalid';
    let parsedDataId = ObjectId(dataId);
    const dataCollection = await dailyData();
    let dataInfo = await dataCollection.findOne({_id:parsedDataId});
    if (!dataInfo || dataInfo === null) throw 'no daily data with the provided id';
    return dataInfo;
}

async function getAllData(){
    const dataCollection = await dailyData();
    let allData = await dataCollection.find({}).toArray();
    return allData;
}

async function removeDataById(dataId){
    if (!dataId) throw 'dataId must be supplied';
    if (typeof dataId != 'string' || !dataId.trim()) throw 'the input dataId is invalid';
    let parsedDataId = ObjectId(dataId);
    const dataCollection = await dailyData();
    let deleteInfo = dataCollection.removeOne({_id:parsedDataId});
    if (deleteInfo.deletedCount === 0) {
        throw 'Could not delete the data';
    }
    return true;
}

async function addData(dailyCases, dailyDeath, dailyVaccination, dailyRecover, sum_of_cases, sum_of_death, sum_of_vaccination, sum_of_recover, change_date){
    if (!dailyCases || typeof dailyCases != 'string' || !dailyCases.trim()) throw 'invalid dailyCases'
    if (!dailyDeath || typeof dailyDeath != 'string' || !dailyDeath.trim()) throw 'invalid dailyDeath'
    if (!dailyVaccination || typeof dailyVaccination != 'string' || !dailyVaccination.trim()) throw 'invalid dailyVaccination'
    if (!dailyRecover || typeof dailyRecover != 'string' || !dailyRecover.trim()) throw 'invalid dailyRecover'
    if (!sum_of_cases || typeof sum_of_cases != 'string' || !sum_of_cases.trim()) throw 'invalid sum_of_cases'
    if (!sum_of_death || typeof sum_of_death != 'string' || !sum_of_death.trim()) throw 'invalid sum_of_death'
    if (!sum_of_vaccination || typeof sum_of_vaccination != 'string' || !sum_of_vaccination.trim()) throw 'invalid sum_of_vaccination'
    if (!sum_of_recover || typeof sum_of_recover != 'string' || !sum_of_recover.trim()) throw 'invalid sum_of_recover'
    if (!change_date || typeof change_date != 'string' || !change_date.trim()) throw 'invalid change_date'

    var newData = {
        dailyCases: dailyCases,
        dailyDeath: dailyDeath,
        dailyVaccination: dailyVaccination,
        dailyRecover: dailyRecover,
        sum_of_cases: sum_of_cases,
        sum_of_death: sum_of_death,
        sum_of_vaccination: sum_of_vaccination,
        sum_of_recover: sum_of_recover,
        change_date: change_date,
    }
    const dataCollection = await dailyData();
    let insertInfo = await dataCollection.insertOne(newData);
    if (!insertInfo || insertInfo === null) throw 'failed to add the newData';
    return insertInfo;
}

module.exports = {
    getDataById,
    getAllData,
    removeDataById,
    addData
}