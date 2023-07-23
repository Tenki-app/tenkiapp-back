require('dotenv').config();

const { connectDatabase } = require('./database');
const routerApi = require('./routes/index.routes.ts');
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();
const credentials = require('./middlewares/credentials');

connectDatabase();
app.use(credentials);

app.use(cors({ origin: 'http://localhost:3000' }));
require('./utils/auth');
app.use(express.json());
app.use(cookieParser());
routerApi(app);

export { app };
