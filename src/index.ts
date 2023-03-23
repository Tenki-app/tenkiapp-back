import { connectDatabase } from './database';
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/user.routes');
const PORT = process.env.PORT;
const { USERS_ENDPOINTS } = require('./utils/endpoint.constants');

app.use(cors());
app.use(express.json());
connectDatabase();

app.use(USERS_ENDPOINTS.GET_ALL_USERS, userRoutes);
app.listen(PORT, () => {
	// server started asynchronously
	console.log(`Server running on http://localhost:${PORT}`);
});
console.log('Tenki');

export {};
