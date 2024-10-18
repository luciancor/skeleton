import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const dbUri = process.env.DB_URI_PATTERN
  .replace('#DB_USER#', process.env.DB_USER)
  .replace('#DB_PASS#', encodeURIComponent(process.env.DB_PASS))
  .replace('#DB_ENDPOINT#', process.env.DB_ENDPOINT);

const dbClient = await mongoose.connect(
  dbUri,
  {
    dbName: 'skeleton'
  }
)

const bones = dbClient.model(
  'bones',
  new mongoose.Schema({
    name: String,
  }, { strict: true }));

const fake = [
  {
    _id: 1,
    name: 'Static 1',
  },
  {
    _id: 2,
    name: 'Random 2',
  },
  {
    _id: 3,
    name: 'Extra random',
  },
];

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '5mb' }));

app.get('/api/v1/users', async (req, res) => {
  res.send(fake.concat(await bones.find()));
});

app.post('/api/v1/users', async (req, res) => {
  const { name } = req.body;

  res.send(bones.create({ name }));
});


app.listen(8080);
