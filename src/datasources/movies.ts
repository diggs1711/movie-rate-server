const { SQLDataSource } = require('datasource-sql');

const MINUTE = 60;

class MoviesAPI extends SQLDataSource {
	private table = 'MovieRate.dbo.Movie';

	async getMovie(id: number) {
		return this.db.select('*').from(this.table).where({ id }).first().cache(MINUTE);
	}

	getMovies() {
		return this.db.select('*').from(this.table).cache(MINUTE);
	}
}

module.exports = MoviesAPI;
