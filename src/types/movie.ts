const MovieType = `
    type Movie {
        name: String
        description: String
        id: ID
    }

    extend type Query {
		movies: [Movie!]
		movie(id: ID!): Movie
	}
`
module.exports = MovieType
