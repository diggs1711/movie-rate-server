const { SQLDataSource } = require('datasource-sql')
import DataLoader from 'dataloader'
const MINUTE = 60

class MoviesAPI extends SQLDataSource {
	private table = 'MovieRate.dbo.Movie'

	private movieLoader = new DataLoader(async (ids) => {
		const movies = await this.db
			.select('*')
			.from(this.table)
			.whereIn('MovieID', ids)
			.cache(MINUTE)
		return ids.map((id) => movies.find((movie) => movie.MovieID == id))
	})

	async getMovie(id: number) {
		return this.movieLoader.load(id)
	}

	getMovies() {
		console.log('getting movies')
		return this.db.select('*').from(this.table)
	}
}

module.exports = MoviesAPI
