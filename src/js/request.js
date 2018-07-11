import request from 'request-promise';

const _request = (options) => {
  console.log(options.method + ' ' + options.uri);
  console.log('body', options.body);
  return request(options);
};

const getJson = (options) => {
  return _request(Object.assign({}, options, {
    method: 'GET',
    json: true
  }))
    .then(r => {
      if(!r) {
        return Promise.resolve();
      }
      console.log('response', JSON.stringify(r, null, 4));
      return Promise.resolve(r);
    });
};

module.exports = {
  getJson
};
