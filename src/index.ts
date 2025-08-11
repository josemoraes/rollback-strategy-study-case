import express from 'express';
import { routes } from './routes';
import pino from "pino";

const logger = pino();

const app = express();

app.use(express.json());
app.use(routes);

const _PORT = 8000;

app.listen(_PORT, () => {
  logger.info(`Running rollback-strategy-study-case on port ${_PORT}`);
});