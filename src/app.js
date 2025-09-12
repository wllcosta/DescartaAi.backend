require('dotenv').config();
const express = require('express');
const cors = require('cors');
const chatRoutes = require('./api/routes/chat.routes');
const errorHandler = require('./middlewares/error-handler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', chatRoutes);

app.use(errorHandler);

module.exports = app;