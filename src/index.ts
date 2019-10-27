import { ApolloServer, gql } from 'apollo-server';
import { knexConfig } from '../config/knex';

const { RedisCache } = require('apollo-server-cache-redis');
const MoviesAPI = require('./datasources/movies');

const typeDefs = gql`
	type Movie {
		Name: String
		Description: String
	}

	type Query {
		movies: [Movie]!
		movie(id: ID!): Movie
	}
`;

const resolvers = {
	Query: {
		movies: async (_source, args, { dataSources }) => {
			return dataSources.moviesAPI.getMovies();
		},
		movie: async (_source, { id }, { dataSources }) => {
			return dataSources.moviesAPI.getMovie(id);
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	cache: new RedisCache({
		host: 'localhost'
	}),
	dataSources: () => ({ moviesAPI: new MoviesAPI(knexConfig) })
});

server.listen().then(({ url }) => {
	console.log(`server ready at ${url}`);
});
