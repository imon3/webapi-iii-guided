const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');

const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.use('/api/hubs', hubsRouter);

server.get('/', (req, res, next) => {
  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome to the Lambda Hubs API</p>
    `);
});

server.use((req, res) => {
  res.status(404).send('Aint nobody got time for that!')
})

module.exports = server;
