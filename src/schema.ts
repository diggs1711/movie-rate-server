const { makeExecutableSchema, addSchemaLevelResolveFunction } = require('graphql-tools')
const { merge } = require('lodash')

//resolvers
const MovieQueries = require('./api/query/movie')
const MovieResolver = require('./api/Movie/index')

//types
const Movie = require('./types/movie')

const resolvers = merge({}, MovieQueries, MovieResolver)

const Root = /* GraphQL */ `
  # The dummy queries and mutations are necessary because
  # graphql-js cannot have empty root types and we only extend
  # these types later on
  # Ref: apollographql/graphql-tools#293
  type Query {
    dummy: String
  }
  type Mutation {
    dummy: String
  }
  type Subscription {
    dummy: String
  }
  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }
`

const schema = makeExecutableSchema({
	typeDefs: [ Root, Movie ],
	resolvers
})

export default schema
