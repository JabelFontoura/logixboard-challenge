import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { app } from './app';
import { errorHandler } from './middlewares/error-handler';

const port = 3000;

const startUp = async () => {
  try {
    const mongoInMemory = await MongoMemoryServer.create();
    const mongoUri = await mongoInMemory.getUri();

    await mongoose.connect(mongoUri);
  } catch (error) {
    console.error(error);
  }

  app.use(errorHandler);
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
};

startUp();
