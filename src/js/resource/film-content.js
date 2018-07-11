import contentSchema from '../../json/file-content-schema.json';
import validator from '../validator/json-validator';
import request from '../request';

let _resourcePrefix = 'https://content.viaplay.se/pc-se/';

const setResourcePrefix = prefix => {
  _resourcePrefix = prefix;
};

const parseJson = content => {
  if(!validator.isJsonValid(content, contentSchema)) {
    throw new Error('invalid film content json');
  }

  return {
    imdbId: content._embedded["viaplay:blocks"][0]._embedded["viaplay:product"].content.imdb.id
  };
};

const getResourceKey = link => {
  console.log('_resourcePrefix', _resourcePrefix);
  let index = link.indexOf(_resourcePrefix);
  if(index < 0) {
    return;
  }
  return link.substring(index+_resourcePrefix.length);
};

const getContent = link => {
  return request.getJson({uri: link})
    .then(r => {
      const parsedContent = parseJson(r);
      return Promise.resolve(parsedContent);
    });
};

module.exports = {
  parseJson,
  getResourceKey,
  setResourcePrefix,
  getContent
};
