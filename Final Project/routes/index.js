const path = require('path');
const usersRoutes = require("./users");
const vaccineInjectionSiteRoutes = require("./vaccineInjectionSite");
const administrationRoutes = require("./administration");
const commentsRoutes = require("./comments");
const reservationRoutes = require("./reservation");
const dailyDataRoutes = require("./dailyData");
const privateRoutes = require("./private");

const constructorMethod = app => {
    app.use("/users", usersRoutes);
    app.use("/vaccineInjectionSite", vaccineInjectionSiteRoutes);
    app.use("/administration", administrationRoutes);
    app.use("/comments", commentsRoutes);
    app.use("/reservation", reservationRoutes);
    app.use("/dailyData", dailyDataRoutes);
    app.use("/private", privateRoutes);


    app.get('/', (req, res) => {
        res.redirect('http://localhost:3000/private');
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;