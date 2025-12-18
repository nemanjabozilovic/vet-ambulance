import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import swaggerUi from 'swagger-ui-express';
import { logger } from './shared/logger';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { swaggerSpec } from './config/swagger';
import { veterinariansRoutes } from './modules/veterinarians/veterinarians.routes';
import { petsRoutes } from './modules/pets/pets.routes';

export const app = express();

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/veterinarians', veterinariansRoutes);
app.use('/api/pets', petsRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use(notFoundHandler);
app.use(errorHandler);

