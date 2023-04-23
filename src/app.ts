require('dotenv').config();

const { connectDatabase } = require('./database');
const routerApi = require('./routes/index.routes.ts');
const express = require('express');
const cors = require('cors');
const app = express();

connectDatabase();
app.use(cors());
require('./utils/auth');
app.use(express.json());
routerApi(app);

export { app };
