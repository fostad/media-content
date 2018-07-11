import { getTrailer, getTrailerLink } from '../resource/trailer';
import { getResourceKey, getContent } from '../resource/film-content';

let cacheInst;

const setCacheInst = inst => {
  cacheInst = inst;
};

const _getTrailer = (link, key) => {
  return getContent(link)
    .then(r => {
      const { imdbId } = r;
      console.log('imdbId', imdbId);
      return getTrailer(imdbId);
    })
    .then(r => {
      if(!r) {
        return Promise.reject('NOT_FOUND');
      }

      const trailerLink = getTrailerLink(r);
      if(!trailerLink) {
        return Promise.reject(new Error('could not find trailer key'));
      }
      cacheInst.addEntity(key, {trailerLink});
      return Promise.resolve({trailerLink});
    });
};

const findTrailer = (link) => {
  return Promise.resolve()
    .then(() => {
      let key;

      try {
        key = getResourceKey(link);
      } catch (e) {
        return Promise.reject(e);
      }

      if(!key) {
        console.log('could not get the key');
        return Promise.reject('BAD_REQUEST');
      }

      const entity = cacheInst.getEntity(key);
      if(entity && entity.value && entity.value.trailerLink) {
        console.log('found it in cache', entity);
        return Promise.resolve({trailerLink: entity.value.trailerLink});
      }

      return _getTrailer(link, key);
    });
};

module.exports = {
  findTrailer,
  setCacheInst
};
