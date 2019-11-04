export default async (_, __, { dataSources }) => {
	return dataSources.moviesAPI.getMovies()
}
