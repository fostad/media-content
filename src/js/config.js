const config = {
  development: {
    port: "3000",
    cacheMaxLength: '500',
    movieDBUrl: 'https://api.themoviedb.org/3/movie',
    movieDBAPIKey: process.env.MOVIE_DB_API_KEY
  }
};

module.exports = config[process.env.NODE_ENV];
