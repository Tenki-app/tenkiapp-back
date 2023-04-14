const { app } = require('./app');
const PORT = process.env.PORT;
const PATH = process.env.PATH
app.listen(PORT, () => {
	// server started asynchronously
	console.log(`Server running on ${PATH}${PORT}`);
});

export { };
