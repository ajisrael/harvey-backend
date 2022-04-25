import express from 'express';
import bodyParser from 'body-parser';

import gardenBedRoutes from './routes/gardenBedRoutes.js';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('API is running...');
  res.send('API is running...');
});

app.use('/api/gardenBed', gardenBedRoutes);

app.listen(5000, console.log('Server running on port 5000'));
