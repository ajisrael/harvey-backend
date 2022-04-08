import express from 'express';
import gardenBedConfig from './esp32_node_config/gardenBedConfig.js';

const app = express();

app.get('/', (req, res) => {
  console.log('API is running...');
  res.send('API is running...');
});

app.get('/api/esp32config/gardenBed', (req, res) => {
  console.log('Returning garden bed config');
  res.json(gardenBedConfig);
});

app.listen(5000, console.log('Server running on port 5000'));
