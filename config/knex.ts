const dotenv = require('dotenv');
dotenv.config();

export const knexConfig = {
	client: 'mssql',
	connection: {
		host: '127.0.0.1',
		user: 'sa',
		password: process.env.DB_PASSWORD,
		database: 'MovieRate'
	}
};
