import path from "path";

import express from "express";

const app = express();

app.use(express.static('public'))

app.get('/login', async (req, res) => {
    return res.sendFile(path.resolve('public/auth.html'))
})

app.get('/health', (req, res) => {
    return res.status(200).json({
        status: 'OK',
    })
})

export { app }
