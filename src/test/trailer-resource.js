import { getTrailerLink, getTrailer } from '../js/resource/trailer';
import validator from '../js/validator/json-validator';
import request from '../js/request';

import sinon from 'sinon';
import chai from 'chai';

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('trailer-resource', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('getTrailerLink', () => {
    it('should return undefined when trailer is undefined', () => {
      expect(getTrailerLink()).to.be.undefined;
    });

    it('should return undefined when trailer does not have key field', () => {
      expect(getTrailerLink({})).to.be.undefined;
    });

    it('should return trailer link', () => {
      expect(getTrailerLink({key: 'foo'})).to.equal('https://www.youtube.com/watch?v=foo');
    });
  });

  describe('getTrailer', () => {
    it('should get rejected if trailer json is not valid', (done) => {
      sandbox.stub(validator, 'isJsonValid').returns(false);
      sandbox.stub(request, 'getJson').returns(Promise.resolve());
      getTrailer()
        .catch(done());
    });

    it('should return trailer', (done) => {
      sandbox.stub(validator, 'isJsonValid').returns(true);
      sandbox.stub(request, 'getJson').returns(Promise.resolve({results: [{type: 'Trailer', id: 'foo'}]}));
      getTrailer()
        .then((r) => {
          expect(r).to.deep.equal({type: 'Trailer', id: 'foo'});
          done();
        })
        .catch(e => console.log(e));
    });
  });
});
