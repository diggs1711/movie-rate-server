import path from 'path'
import { readdirSync, readFileSync } from 'fs'
import { knexConfig as config } from '../../config/knex'
import Knex from 'knex'

export const execSystemQuery = async (query: string): Promise<void> => {
	const mssqlConfig = {
		...config,
		connection: { ...config.connection, database: 'master' }
	}
	const knex = Knex(mssqlConfig)

	await knex.raw(query).finally(() => knex.destroy())
}

export const sqlFromFile = async (knex: Knex, filepath: string) => {
	const dirPath = path.join(__dirname, filepath)
	const filePaths = readdirSync(dirPath)
	return filePaths.reduce(
		(prev, cur) =>
			prev.then(() => knex.raw(readFileSync(path.join(dirPath, cur), { encoding: 'UTF8' }))),
		Promise.resolve()
	)
}
