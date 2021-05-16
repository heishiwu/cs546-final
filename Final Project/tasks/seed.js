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
    let u1 = await users.createUser({ "firstName": "Yi", "lastName": "Lin" }, "username1", "$2a$10$S47.YnORnIZRLpMOSOINm.eUL4FoSLBFaWfk7qWT65.0c7unyjzGi", "username1@gmail.com",
        { "addressLine": "1313 Grand St.", "apartment_suite_unitNumber": "APT 304", "city": "hoboken", "county": "hudson", "state": "NJ", "postalCode": "07030" }, "02/03/1998", "Male",
        "Asian", "Not Hispanic or latino", { "insuranceType": "Private Insurance", "insuranceName": "HuHu" }, "HDEPO National HRA", "sdasdad-sdasd-sdsd");
    let u1_userid = u1._id.toHexString();
    console.log("u1");
    // console.log(u1_userid);

    let u2 = await users.createUser({ "firstName": "Yi", "lastName": "Lin" }, "username2", "$2a$10$0A53QP0G0oeux7RFlNUqHuK7j5GU3zJjgYj3IQk02s4SznXUmcBLS", "username2@gmail.com",
        { "addressLine": "1313 Grand St.", "apartment_suite_unitNumber": "APT 304", "city": "hoboken", "county": "hudson", "state": "NJ", "postalCode": "07030" }, "02/03/1998", "Male",
        "Asian", "Not Hispanic or latino", { "insuranceType": "Private Insurance", "insuranceName": "HuHu" }, "HDEPO National HRA", "sdasdad-sdasd-sdsd");
    let u2_userid = u2._id.toHexString();
    console.log("u2");


    let s1 = await vaccineInjectionSite.createSite("River Side1",
        {
            "addressLine": "1313 Grand St.",
            "apartment_suite_unitNumber": "APT 304",
            "city": "hoboken",
            "county": "hudson",
            "state": "NJ",
            "postalCode": "07030"
        },
        "4.5"
    );

    let s1_siteid = s1._id.toHexString();
    console.log("s1");

    let s2 = await vaccineInjectionSite.createSite("River Side2",
        {
            "addressLine": "1313 Grand St.",
            "apartment_suite_unitNumber": "na",
            "city": "hoboken",
            "county": "hudson",
            "state": "NJ",
            "postalCode": "07030"
        },
        "4.5"
    );
    let s2_siteid = s2._id.toHexString();
    console.log("s2");
    let s3 = await vaccineInjectionSite.createSite("NYC Health + Hospitals/Queens: Emergency Room",
        {
            "addressLine": "82-68 164th St",
            "apartment_suite_unitNumber": "na",
            "city": "Jamaica",
            "county": "na",
            "state": "NY ",
            "postalCode": "11432"
        },
        "4.5"
    );
    let s3_siteid = s3._id.toHexString();
    console.log("s3");
    let s4 = await vaccineInjectionSite.createSite("CVS Pharmacy",
        {
            "addressLine": "1900 7th St NW",
            "apartment_suite_unitNumber": "na",
            "city": "Washington",
            "county": "na",
            "state": "DC",
            "postalCode": "20001"
        },
        "4.5"
    );
    console.log("s4");    
    let s4_siteid = s4._id.toHexString();
    let s5 = await vaccineInjectionSite.createSite("Walgreens Pharmacy",
    {
        "addressLine": "1418 Cedar Rd",
        "apartment_suite_unitNumber": "na",
        "city": "Chesapeake",
        "county": "na",
        "state": "VA",
        "postalCode": "23322"
    },
    "4.5"
);
    let s5_siteid = s5._id.toHexString();
    console.log("s5");

    let a1 = await administration.addAdmin("admin", "123456");

    console.log("a1");

    let c1 = await comments.addComment(u1_userid, s1_siteid, "4.1", "Nice1 and Social distant");
    let c1_id = c1._id.toHexString();
    console.log("c1");
    let c2 = await comments.addComment(u1_userid, s2_siteid, "4.2", "Nice2 and Social distant");
    let c2_id = c2._id.toHexString();
    console.log("c2");
    let c3 = await comments.addComment(u2_userid, s1_siteid, "4.3", "Nice3 and Social distant");
    let c3_id = c3._id.toHexString();
    console.log("c3");
    let c4 = await comments.addComment(u2_userid, s2_siteid, "4.4", "Nice4 and Social distant");
    let c4_id = c4._id.toHexString();
    console.log("c4");

    let r1 = await reservations.addReservation(u1_userid, s1_siteid, "2021-01-01");
    let r1_id = r1._id.toHexString();
    console.log("r1");
    let r2 = await reservations.addReservation(u1_userid, s2_siteid, "2021-02-02");
    let r2_id = r2._id.toHexString();
    console.log("r1");
    let r3 = await reservations.addReservation(u2_userid, s1_siteid, "2021-03-03");
    let r3_id = r3._id.toHexString();
    console.log("r1");
    let r4 = await reservations.addReservation(u2_userid, s2_siteid, "2021-04-04");
    let r4_id = r4._id.toHexString();
    console.log("r1");

    u1 = await users.addCommentAndReservation(u1_userid, c1_id, r1_id);
    console.log("u1");

    u2 = await users.addCommentAndReservation(u1_userid, c2_id, r2_id);
    console.log("u2");

    u3 = await users.addCommentAndReservation(u2_userid, c3_id, r3_id);
    console.log("u3");

    u4 = await users.addCommentAndReservation(u2_userid, c4_id, r4_id);
    console.log("u4");

    s1 = await vaccineInjectionSite.addCommentAndReservation(s1_siteid, c1_id, r1_id);
    console.log("s1");

    s2 = await vaccineInjectionSite.addCommentAndReservation(s2_siteid, c2_id, r2_id);
    console.log("s1");

    s1 = await vaccineInjectionSite.addCommentAndReservation(s2_siteid, c4_id, r4_id);
    console.log("s1");

    s1 = await vaccineInjectionSite.addCommentAndReservation(s1_siteid, c3_id, r3_id);
    console.log("s1");
    
    const d1 = await dailyData.addData('200', '20', '1000', '50', '1000', '20', '1000', '50', '2021-3-10')
    const d2 = await dailyData.addData('56', '21', '3000', '98', '256', '41', '4000', '148', '2021-3-11')
    const d3 = await dailyData.addData('158', '56', '1206', '153', '356', '76', '6000', '567', '2021-3-16')
    const d4 = await dailyData.addData('68', '9', '998', '257', '589', '124', '12553', '954', '2021-3-20')
    const d5 = await dailyData.addData('12', '16', '2014', '545', '854', '356', '17864', '1205', '2021-3-26')

    await db.serverConfig.close();
    console.log('Done!');
}


main().catch((error) => {
    console.log(error);
});