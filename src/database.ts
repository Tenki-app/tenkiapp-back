require('dotenv').config();

const mongoose = require('mongoose');
const url = process.env.MONGODB_CNN;

const connectDatabase = () => {
	mongoose
		.connect(url)
		.then(() => console.log('Connected successfully to the cluster'))
		.catch((err: Error) => console.error(err));
};

export { connectDatabase };
