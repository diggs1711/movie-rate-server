module.exports = {
	Movie: {
		name: (parent) => {
			return parent.Name
		},
		description: (parent) => {
			return parent.Description
		},
		id: (parent) => {
			return parent.MovieID
		}
	}
}
