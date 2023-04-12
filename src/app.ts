require('dotenv').config();

const { connectDatabase } = require('./database');
const routerApi = require('./routes/index.routes.ts');
const express = require('express');
const cors = require('cors');
const app = express();

connectDatabase();

routerApi(app);

app.use(cors());
app.use(express.json());

export { app };
