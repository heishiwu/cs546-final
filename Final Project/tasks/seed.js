const connection = require('../config/mongoConnection');
const users = require('../data/users');
const vaccineInjectionSite = require('../data/vaccineInjectionSite');
const comments = require('../data/comments');
const reservations = require('../data/reservation');
const dailyData = require('../data/dailyData');
const administration = require('../data/administration');

async function main() {
    const db = await connection();
    await db.dropDatabase();

    //add code, Yi Lin will add that after I finish the routes.
    let user1 = await users.createUser({"firstName": "Yi", "lastName": "Lin"}, "username", "$2a$10$0A53QP0G0oeux7RFlNUqHuK7j5GU3zJjgYj3IQk02s4SznXUmcBLS","sdasdadas@gmail.com",
        {"addressLine": "1313 Grand St.", "apartment_suite_unitNumber": "APT 304", "city": "hoboken", "county": "hudson", "state": "NJ", "postalCode": "07030"}, "02/03/1998", "Male",
        "Asian", "Not Hispanic or latino", {"insuranceType":"Private Insurance",  "insuranceName":"HuHu"}, "HDEPO National HRA", "sdasdad-sdasd-sdsd");

    let comment1 = await comments.addComment("12eg456-e89b-24d3-a456-426655440000", "13eg456-e89b-24d3-a456-426655440000", "4.5", "Nice and Social distant");

    let reservation1 = await reservations.addReservation("12eg456-e89b-24d3-a456-426655440000", "13eg456-e89b-24d3-a456-426655440000");




    await db.serverConfig.close();
    console.log('Done!');
}


main().catch((error) => {
    console.log(error);
});