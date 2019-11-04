import { ApolloServer, gql } from 'apollo-server-express'
import { knexConfig } from '../config/knex'
import express from 'express'
import compression from 'compression'
const { RedisCache } = require('apollo-server-cache-redis')
const MoviesAPI = require('./datasources/movies')
import schema from './schema'
import responseCachePlugin from 'apollo-server-plugin-response-cache'
import cors from 'cors'

const app = express()

const server = new ApolloServer({
	schema: schema,
	cache: new RedisCache({
		host: 'localhost',
		prefix: 'apollo-cache:'
	}),
	context: () => {
		const loggedIn = Math.random() > 0.5 ? true : false
		console.log({ loggedIn })

		return {
			user: loggedIn
				? {
						id: 1
					}
				: null
		}
	},
	persistedQueries: {
		cache: new RedisCache({
			host: 'localhost',
			prefix: 'apq-apollo-cache:'
		})
	},
	dataSources: () => ({ moviesAPI: new MoviesAPI(knexConfig) }),
	plugins: [
		responseCachePlugin({
			sessionId: ({ context }) => (context.user ? context.user.id : null),
			shouldReadFromCache: ({ context }) => !context.user,
			shouldWriteToCache: ({ context }) => !context.user
		})
	],
	cacheControl: {
		calculateHttpHeaders: false,
		defaultMaxAge: 600,
		stripFormattedExtensions: true
	},
	playground: process.env.NODE_ENV != 'production' && {
		settings: {
			'editor.theme': 'dark'
		},
		tabs: [
			{
				// endpoint: 'localhost:4000/api',
				query: `{
					movies {
					  name
					  description
					}
				  }`
			}
		]
	}
})

server.applyMiddleware({ app })

app.use(compression())
app.use(cors())

app.listen({ port: 4000 }, () => {
	console.log(`server ready at http://localhost:4000${server.graphqlPath}`)
})
