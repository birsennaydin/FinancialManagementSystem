const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api/users', userRoutes);

module.exports = app;
