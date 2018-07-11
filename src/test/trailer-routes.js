import chai from 'chai';
import chaiHttp from 'chai-http';
import { setResourcePrefix } from '../js/resource/film-content';
const server = require('../js/server')(3000);
const jsonValidator = require('../js/validator/json-validator');
jsonValidator.createValidator();

const expect = chai.expect;

chai.use(chaiHttp);
describe('trailer-api', () => {
  describe('GET /trailers', () => {
    it('should return a trailer for the movie', (done) => {
      setResourcePrefix('https://content.viaplay.se/pc-se/');

      chai.request(server)
        .get('/trailers?link=https://content.viaplay.se/pc-se/film/arrival-2016')
        .end((err, res) => {
          console.log('res', res.body);
          expect(res.statusCode).to.equal(200);
          expect(res.body.trailerLink).to.equal('https://www.youtube.com/watch?v=tFMo3UJ4B4g');
          done();
        });
    });
  });
});
