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
    let u1 = await users.createUser({"firstName": "Yi", "lastName": "Lin"}, "username1", "$2a$10$S47.YnORnIZRLpMOSOINm.eUL4FoSLBFaWfk7qWT65.0c7unyjzGi","sdasdadas@gmail.com",
        {"addressLine": "1313 Grand St.", "apartment_suite_unitNumber": "APT 304", "city": "hoboken", "county": "hudson", "state": "NJ", "postalCode": "07030"}, "02/03/1998", "Male",
        "Asian", "Not Hispanic or latino", {"insuranceType":"Private Insurance",  "insuranceName":"HuHu"}, "HDEPO National HRA", "sdasdad-sdasd-sdsd");
    let u1_userid = u1._id.toHexString();

    let u2 = await users.createUser({"firstName": "Yi", "lastName": "Lin"}, "username2", "$2a$10$0A53QP0G0oeux7RFlNUqHuK7j5GU3zJjgYj3IQk02s4SznXUmcBLS","asdadas@gmail.com",
        {"addressLine": "1313 Grand St.", "apartment_suite_unitNumber": "APT 304", "city": "hoboken", "county": "hudson", "state": "NJ", "postalCode": "07030"}, "02/03/1998", "Male",
        "Asian", "Not Hispanic or latino", {"insuranceType":"Private Insurance",  "insuranceName":"HuHu"}, "HDEPO National HRA", "sdasdad-sdasd-sdsd");
    let u2_userid = u2._id.toHexString();

    let s1 = await vaccineInjectionSite.createSite("River Side1" ,
        { "addressLine": "1232 Grand St.",
            "apartment_suite_unitNumber": "APT 304",
            "city": "hoboken",
            "county": "hudson",
            "state": "NJ",
            "postalCode": "07030"
        },
        [],
        [],
        "4.5"
    );

    let s1_siteid = s1._id.toHexString();

    let s2 = await vaccineInjectionSite.createSite("River Side2" ,
        { "addressLine": "1232 Grand St.",
            "apartment_suite_unitNumber": "APT 304",
            "city": "hoboken",
            "county": "hudson",
            "state": "NJ",
            "postalCode": "07030"
        },
        [],
        [],
        "4.5"
    );

    let s2_siteid = s2._id.toHexString();




    let c1 = await comments.addComment(u1_userid, s1_siteid, "4.1", "Nice1 and Social distant");
    let c2 = await comments.addComment(u1_userid, s2_siteid, "4.2", "Nice2 and Social distant");
    let c3 = await comments.addComment(u2_userid, s1_siteid, "4.3", "Nice3 and Social distant");
    let c4 = await comments.addComment(u2_userid, s2_siteid, "4.4", "Nice4 and Social distant");

    let r1 = await reservations.addReservation(u1_userid, s1_siteid, "01/01/2021");
    let r2 = await reservations.addReservation(u1_userid, s2_siteid, "02/02/2021");
    let r3 = await reservations.addReservation(u2_userid, s1_siteid, "03/03/2021");
    let r4 = await reservations.addReservation(u2_userid, s2_siteid, "04/04/2021");




    await db.serverConfig.close();
    console.log('Done!');
}


main().catch((error) => {
    console.log(error);
});