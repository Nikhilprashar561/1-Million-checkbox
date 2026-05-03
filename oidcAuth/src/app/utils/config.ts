import 'dotenv/config';

export const config = {
    port: Number(process.env.PORT) || 3000,
    databaseUrl: process.env.DATABASE_URL,

    server_url: `${process.env.SERVER_URL}:${process.env.PORT || 3000}`,
}
