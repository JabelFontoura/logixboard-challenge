import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import { json } from 'body-parser';
import { organizationRouter } from './routes/organization.route';
import { shipmentRouter } from './routes/shiptment.route';
import { NotFoundError } from './errors/not-found-error';

const app = express();

app.use(json());
app.use(organizationRouter);
app.use(shipmentRouter);
app.all('*', async (req: Request, res: Response, next: NextFunction) => {
  throw new NotFoundError();
});

export { app };
