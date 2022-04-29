const { connect, connection } = require('mongoose');
import {config} from 'dotenv';

const database = () => {
	config(); //invoking the dotenv config here
	const uri = process.env.DB_URI;

	//Set up mongoose connection
	connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
		.then(() => {
			console.log('Connection estabislished with MongoDB');
		})
		.catch((error: any) => console.error(error.message));

	connection.on('connected', () => {
		console.log('Mongoose connected to DB Cluster');
	})

	connection.on('error', (error: any) => {
		console.error(error.message);
	})

	connection.on('disconnected', () => {
		console.log('Mongoose Disconnected');
	})

	process.on('SIGINT', () => {
		connection.close(() => {
			console.log('Mongoose connection closed on Application Timeout');
			process.exit(0);
		})
	});

}

module.exports = database;