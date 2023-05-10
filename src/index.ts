require('dotenv').config();
const { app } = require('./app');
const PORT = process.env.PORT;
const PATH = process.env.CONNECTIONPATH;
const server = app.listen(PORT, () => {
	console.log(`Server running on ${PATH}${PORT}`);
});
module.exports = server;
export {};
