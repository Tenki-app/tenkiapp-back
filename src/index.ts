import { app } from './app';
const PORT = process.env.PORT;
app.listen(PORT, () => {
	// server started asynchronously
	console.log(`Server running on http://localhost:${PORT}`);
});

export {};
