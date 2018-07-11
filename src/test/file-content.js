import { parseJson, getResourceKey, setResourcePrefix } from '../js/resource/film-content';
import validator from '../js/validator/json-validator';

import sinon from 'sinon';
import chai from 'chai';

const expect = chai.expect;
const sandbox = sinon.createSandbox();

describe('file-content', () => {
  afterEach(() => {
    sandbox.restore();
  });

  describe('parseJson', () => {
    it('should throw an error when json is not valid', () => {
      sandbox.stub(validator, 'isJsonValid').returns(false);
      expect(parseJson).to.throw(Error);
    });
  });

  describe('getResourceKey', () => {
    it('should return undefined when string does not contain correct prefix', () => {
      setResourcePrefix('foo');
      expect(getResourceKey('bar')).to.be.undefined;
    });

    it('should return the key', () => {
      setResourcePrefix('foo');
      expect(getResourceKey('foobar')).to.be.equal('bar');
    });
  });
});
