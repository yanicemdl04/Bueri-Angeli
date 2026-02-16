import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes/index.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { config } from './config/index.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);
app.use(notFound);
app.use(errorHandler);

// Capture des signaux d'arrêt
const handleShutdown = async () => {
  console.log("\nSignal reçu. Fermeture de Bueri-Angeli...");
  if (server) {
      server.close(async () => {
          console.log("Serveur HTTP fermé.");
          await prisma.disconnect(); 
          process.exit(0);
      });
  } else {
      await prisma.disconnect();
      process.exit(0);
  }
};
process.on('SIGINT', handleShutdown);
process.on('SIGTERM', handleShutdown);

app.listen(config.port, () => {
  console.log(`Serveur Bueri-Angeli sur http://localhost:${config.port}`);
  console.log(`API: http://localhost:${config.port}/api`);
});
