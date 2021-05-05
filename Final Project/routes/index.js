const path = require('path');
const usersRoutes = require("./users");
const vaccineInjectionSiteRoutes = require("./vaccineInjectionSite");
const administrationRoutes = require("./administration");
const commentsRoutes = require("./comments");
const reservationRoutes = require("./reservation");
const dailyDataRoutes = require("./dailyData");

const constructorMethod = app => {
    app.use("/users", usersRoutes);
    app.use("/vaccine", vaccineInjectionSiteRoutes);
    app.use("/admin", administrationRoutes);
    app.use("/comments", commentsRoutes);
    app.use("/reservation", reservationRoutes);
    app.use("/daily", dailyDataRoutes);


    app.get('/', (req, res) => {
        return res.render('landing/landing', {
            authenticated: req.session.user ? true : false,
            user: req.session.user,
            partial: 'landing-script',
            title: 'Home'
        });
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;