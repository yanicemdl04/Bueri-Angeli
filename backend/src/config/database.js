import 'dotenv/config';
import { PrismaClient } from '../generated/prisma/index.js';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

const { Pool } = pg;

let instance = null;

class PrismaService extends PrismaClient {
  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined in environment variables');
    }

    const pool = new Pool({
      connectionString: databaseUrl,
    });

    const adapter = new PrismaPg(pool);

    super({
      adapter,
      log: ['info', 'warn', 'error'],
    });
    this.pool = pool;
    console.log('Connexion à la base de données établie.');
  }

  async disconnect() {
    await this.$disconnect();
    await this.pool.end();
    console.log('Déconnexion de la base de données.');
  }

  static getInstance() {
    if (!instance) {
      instance = new PrismaService();
    }
    return instance;
  }
}

const prisma = PrismaService.getInstance();

export default prisma;
