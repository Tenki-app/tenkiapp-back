require('dotenv').config();

const mongoose = require('mongoose');
const url = process.env.MONGODB_CNN;
const urlTest = process.env.MONGODB_CNN_TEST;
const nodeEnv = process.env.NODE_ENV;

const connectionString = nodeEnv === 'test' ? urlTest : url;

const connectDatabase = () => {
	mongoose
		.connect(connectionString)
		.then(() => console.log('Connected successfully to the cluster'))
		.catch((err: Error) => {
			console.error(Error);
		});
};

export { connectDatabase };
