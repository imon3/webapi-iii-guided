const express = require('express'); // importing a CommonJS module - built in middleware
const helmet = require('helmet'); // import security middleware - third party middleware
const morgan = require('morgan'); // inport status code middleware - third party middleware

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

// GLOBAL MIDDLEWARE
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(teamName);
server.use(restricted);
server.use('/api/hubs', restricted, only('mike'));
// server.use(moodyGateKeeper);

server.use('/api/hubs', hubsRouter);

// CUSTOM MIDDLEWARE FUNCTIONS
function teamName(req, res, next) {
  req.team = 'Lambda Students';
  next();
}

function moodyGateKeeper(req, res, next) {
  const seconds = new Date().getSeconds();

  if (seconds % 3 === 0) {
    res.status(403).json('None shall pass');
  } else {
    next();
  }
}

function restricted(req, res, next) {
  const password = req.headers.authorization;

  if (password === 'mellon') {
    next();
  } else {
    res.status(401).json({
      message: 'You are not authorized'
    })
  }
}

function only(name) {
  return function (req, res, next) {
    const username = req.headers.name;

    if (username.toLowerCase() !== name.toLowerCase()) {
      res.status(403).json({
        message: 'Name does not match'
      })
    } else {
      next();
    }
  }
}


// REQUEST
server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome ${req.team} to the Lambda Hubs API</p>
    `);
});

server.use((req, res) => {
  res.status(404).send('Aint nobody got time for that!')
})

module.exports = server;
