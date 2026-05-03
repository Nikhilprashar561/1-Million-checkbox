import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from '../app/utils/config.js';

const db = drizzle(config.databaseUrl!);

export { db };
