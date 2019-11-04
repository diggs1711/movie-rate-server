import Knex from 'knex'
import { knexConfig as config } from '../../config/knex'
import { sqlFromFile, execSystemQuery } from '../util'

async function init() {
	await createDB()
	console.log('database connected')
	const knex = Knex(config)
    //schema
    try {

        await sqlFromFile(knex, '../schema/')
        console.log('schema created')
    } catch {
        console.error("schema failed");
    }
	//seed
	await sqlFromFile(knex, '../seeds/')
	console.log('seeded db')
	return knex
}

async function createDB() {
    console.log('creating')
    try {
        await execSystemQuery(`create database ${config.connection.database}`)
    } catch {
        console.error("failed creating db");
    }
}

console.log('init')
init()
