import express from 'express';
import { oAuthRouter } from './routes/oAuth.routee.js';
import { oidcRouter } from './routes/oidc.routee.js';

export function createExpress(){
    const app = express();

    app.use(express.json());

    app.use(express.static('public'));

    app.get('/health', (req, res) => {
        res.status(200).json({ status: 'ok' });
    });
    
    app.use('/api/oidc', oidcRouter);
    app.use('/api/oauth', oAuthRouter);

    return app;
}
