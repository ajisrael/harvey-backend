import dotenv from 'dotenv';
import express from 'express';
import nodeRoutes from './routes/nodeRoutes.js';
import gardenBedRoutes from './routes/gardenBedRoutes.js';
import pumpRoutes from './routes/pumpRoutes.js';
import solenoidRoutes from './routes/solenoidRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  console.log('API is running...');
  res.send('API is running...');
});

app.use('/api/node', nodeRoutes);
app.use('/api/gardenBed', gardenBedRoutes);
app.use('/api/pumpState', pumpRoutes);
app.use('/api/solenoidState', solenoidRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
