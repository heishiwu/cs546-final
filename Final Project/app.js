const express = require("express");
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const handlebarsInstance = exphbs.create({
    defaultLayout: 'main',
    partialsDir: ['views/partials/']
});

app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

app.use(
    session({
        name: 'AuthCookie',
        secret: 'some secret string!',
        resave: false,
        saveUninitialized: true,
    })
);
configRoutes(app);
app.listen(3000, () => {
    console.log("Your routes will be running on http://localhost:3000");
});