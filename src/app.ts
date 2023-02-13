import express from 'express';
import carRoutes from './Routes/Car.Routes';
import ErrorHandler from './middlewares/ErrorHandler';

const app = express();

app.use(express.json());
app.use('/cars', carRoutes);
app.use(ErrorHandler.handle);

export default app;
