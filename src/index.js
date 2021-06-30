const express = require('express');
const app = express();
const cors = require('cors');

//variable para permitir origenes
var whiteList = ['http://localhost:5000'];

var corsOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Unauthorized by CORS'))
        }
    }
};

const configCors = cors(corsOptions);

//define middlewares
app.use(configCors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//define routes
app.use(require('./routes/index'));

app.listen(3000);
console.log('Initialized Server on Port 3000')