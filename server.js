import express from 'express';
import bodyParser from 'body-parser';
import gardenBedConfig from './esp32_node_config/gardenBedConfig.js';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('API is running...');
  res.send('API is running...');
});

app.get('/api/esp32config/gardenBed', (req, res) => {
  console.log('Returning garden bed config');
  res.json(gardenBedConfig);
});

app.post('/api/data/gardenBed', (req, res) => {
  console.log('Data received from garden bed:');
  console.log(req.body);
  res.send('Success').status(200);
});

app.listen(5000, console.log('Server running on port 5000'));
