# media-content
An API to get media trailer

## Setting up development environment
1. Clone to this repository
2. Set up your TMDb API key: "export MOVIE_DB_API_KEY='your key'"
3. Install dependencies: "npm install"
4. Run: "npm start"

## Sending request
Example: http://localhost:3000/trailers?link=https://content.viaplay.se/pc-se/film/arrival-2016

## Run test cases
Run: "npm run test"

## Things to be improved in the future
1. Proper logger
2. Encode url in the request
3. Authentication
4. Write policy for the cache, not implemented now since only GET request is supported now
