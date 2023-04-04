require('dotenv').config();
import { connectDatabase } from './database';
const { USERS_ENDPOINTS } = require('./utils/endpoint.constants');
const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user.routes');

connectDatabase();

app.use(cors());
app.use(express.json());
app.use(USERS_ENDPOINTS.GET_ALL_USERS, userRoutes);

export { app };
