import express from 'express';
import nodeRoutes from './routes/nodeRoutes.js';
import gardenBedRoutes from './routes/gardenBedRoutes.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log('API is running...');
  res.send('API is running...');
});

app.use('/api/node', nodeRoutes);
app.use('/api/gardenBed', gardenBedRoutes);

app.listen(5000, console.log('Server running on port 5000'));
