import { execSystemQuery } from '../util'
import { knexConfig as config } from '../../config/knex'

async function drop() {
	return execSystemQuery(`
    USE master;
    ALTER DATABASE ${config.connection.database} SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    drop database if exists ${config.connection.database}`)
		.then((res) => {
			return null
		})
		.catch((err) => console.error(err))
}

drop()
