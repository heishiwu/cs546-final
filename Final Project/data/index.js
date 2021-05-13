const userData = require("./users");
const reservationData = require("./reservation");
const commentData = require("./comments");
const dailyData = require("./dailyData");
const administrationData = require("./administration");
const vaccineData = require("./vaccineInjectionSite");

module.exports = {
    users: userData,
    reservation: reservationData,
    comments: commentData,
    dailyData: dailyData,
    administration: administrationData,
    vaccineInjectionSite: vaccineData

};