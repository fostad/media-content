import status from 'http-status';
import worker from '../worker/trailer';
import Cache from '../cache/lru-cache';
import { cacheMaxLength } from '../config';

const cacheInst = new Cache(cacheMaxLength);
worker.setCacheInst(cacheInst);

const getWithQueryParams = (query) => {
  console.log('query', query);
  switch (true) {
  case query.hasOwnProperty('link'): {
    const { link } = query;
    console.log('link', link);
    return worker.findTrailer(link, cacheInst);
  }
  default:
    return Promise.reject('BAD_REQUEST');
  }
};

const handleError = (e, res) => {
  console.log(e);
  switch (e.message) {
  case 'BAD_REQUEST':
    res.status(status.BAD_REQUEST).send('BAD_REQUEST');
    break;
  case 'NOT_FOUND':
    res.status(status.NOT_FOUND).send('NOT_FOUND');
    break;
  default:
    res.status(status.INTERNAL_SERVER_ERROR).send(e);
  }
};

module.exports = (app) => {
  app.get('/trailers', (req, res) => {
    console.log('route for GET trailers');
    if(Object.getOwnPropertyNames(req.query).length !== 0) {
      getWithQueryParams(req.query)
        .then(r => {
          res.status(status.OK);
          res.json(r);
        })
        .catch(e => {
          handleError(e, res);
        });
    } else {
      console.log('request does not have query, not implemented yet');
      res.status(status.BAD_REQUEST).send('BAD_REQUEST');
    }

  });
};
