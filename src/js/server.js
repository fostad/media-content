import express from 'express';
import bodyParser from 'body-parser';

const createServer = (port) => {
  const app = express();

  app.disable('x-powered-by');

  app.use(bodyParser.json({limit: '10mb', type: 'application/json'}));
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use((req, res, next)=> {
    console.log('HTTP '+req.method+' '+req.url+' '+res.statusCode+' '+(req.user ? req.user.person : ''));
    next();
  });

  require('./routes/trailer-routes')(app);

  return app.listen(port, () => console.log('listening on port ' + port));
};



const server = (port) => {
  return createServer(port);
};

module.exports = server;
