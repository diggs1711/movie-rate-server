export default async (_, { id }, { dataSources }) => {
	return dataSources.moviesAPI.getMovie(id)
}
