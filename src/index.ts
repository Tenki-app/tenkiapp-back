import { connectDatabase } from './database';
const PORT = 3001;
const express = require('express');
const app = express();
const cors = require('cors');
const todoRoutes = require('./routes/user.routes');
app.use(cors());
app.use(express.json());
connectDatabase();

app.use('/', todoRoutes);
app.listen(PORT, () => {
	// server started asynchronously
	console.log(`Server running on http://localhost:${PORT}`);
});
console.log('Tenki');

export {};
