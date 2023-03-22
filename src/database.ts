const mongoose = require('mongoose');
const url = 'mongodb+srv://tenkiappteam:nlQ70nOu2PbEGiDI@clustertenki.vqr6xjf.mongodb.net/tenkiDB?retryWrites=true&w=majority';

const connectDatabase = () => {
	mongoose
		.connect(url)
		.then(() => console.log('Connected successfully to the cluster'))
		.catch((err: Error) => console.error(err));
};

export { connectDatabase };
