const express = require('express');
const handlebars = require('express-handlebars');
const mongoConnect = require('../db')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const router = require('./router');
const initializePassport = require('./config/passport.config');
const passport = require('passport');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(__dirname + '/public'));

app.use(cookieParser())
app.use(
    session({
        store: MongoStore.create({
            mongoUrl:
            'mongodb+srv://RoqueMolina:dyvhJb7EFKsGBJom@cluster0.tzihxes.mongodb.net/?retryWrites=true&w=majority',
            mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
        }),
        secret: 'coderSecret',
        resave: false,
        saveUninitialized: false
    })
)

initializePassport()
app.use(passport.initialize())
app.use(passport.session())

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');

mongoConnect();
router(app)


module.exports = app