require('dotenv').config();

const { connectDatabase } = require('./database');
const { auth } = require('express-oauth2-jwt-bearer');
const routerApi = require('./routes/index.routes.ts');
const express = require('express');
const cors = require('cors');

const app = express();

app.use(
	cors({
		origin: ['http://localhost:3000', 'https://tenkiapp-front-git-dev-tenkys-projects.vercel.app', 'https://tenkiapp-front.vercel.app'],
	})
);
app.use(
	auth({
		issuerBaseURL: process.env.ISSUER_BASE_URL,
		audience: process.env.AUDIENCE,
	})
);

connectDatabase();

app.use(express.json());
routerApi(app);

export { app };
