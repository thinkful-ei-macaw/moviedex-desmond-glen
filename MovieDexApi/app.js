require('dotenv').config();

const API_TOKEN = process.env.API_TOKEN;

const helmet = require('helmet');

const store = require('./store');

const express = require('express');

const cors = require('cors');

const app = express();

const morgan = require('morgan');

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use(function validateBearerToken(req, res, next) {
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    if (!authToken || authToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    // move to the next middleware
    next()
})

app.get('/movie', (req, res) => {
    const { genres, country, avg_vote } = req.query;

    return res.json(store)
})

app.listen(8000, () => {
    console.log('Express is listening on PORT 8000')
})