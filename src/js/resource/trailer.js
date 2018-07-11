import { movieDBUrl, movieDBAPIKey } from '../config';
import { find, propEq } from 'ramda';
import request from '../request';
import trailersSchema from '../../json/trailers-schema.json';
import jsonValidator from '../validator/json-validator';

const findTrailer = (r) => {
  return find(propEq('type', 'Trailer'), r.results);
};

const getTrailer = (imdbId) => {
  const options = {
    uri: `${movieDBUrl}/${imdbId}/videos?api_key=${movieDBAPIKey}`
  };
  return request.getJson(options)
    .then(r => {
      if(!jsonValidator.isJsonValid(r, trailersSchema)) {
        return Promise.reject('invalid trailer json');
      }

      const trailer = findTrailer(r);
      console.log('trailer', trailer);
      return Promise.resolve(trailer);
    });
};

const getTrailerLink = (trailer) => {
  console.log('trailer', trailer);
  if(!trailer || !trailer.key) {
    return;
  }
  return `https://www.youtube.com/watch?v=${trailer.key}`;
};

module.exports = {
  getTrailer,
  getTrailerLink
};
