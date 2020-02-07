const keys = require('./keys');

// Express App Setup
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

// PG setup
const { Pool } = require('pg');
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on('error', () => console.log('Lost pg connection'));

pgClient
  .query('CREATE TABLE IF NOT EXISTS values(number INT)')
  .catch(err => console.log(err));

// Redis Client
const redis = require('redis');
const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisHost,
  retry_strategy: () => 1000
});

const redisPublisher = redisClient.duplicate();

// Express API route handlers
app.get('/', (req, res) => {
  res.status(200).send({ check: 'OK' });
});

app.get('/values/all', async (req, res) => {
  // all values from pg
  const values = await pgClient.query('SELECT * FROM values');
  res.send(values.rows);
});

app.get('/values/current', async (req, res) => {
  redisClient.hgetall('values', (err, values) => {
    res.status(200).send(values);
  });
});

app.post('/values/', async (req, res) => {
  const { index } = req.body;
  if (parseInt(index) > 40) {
    return res.status(422).send({ message: `Index ${index} too high` });
  }
  redisClient.hset('values', index, 'Nothing yet!');
  redisPublisher.publish('insert', index);
  pgClient.query('INSERT INTO values (number) VALUES($1)', [index]);
  res.send({ working: true });
});

app.listen(5000, err => {
  console.log('Listening');
});
