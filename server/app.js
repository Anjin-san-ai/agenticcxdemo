import express from 'express';
import path from 'path';
import cors from 'cors';
import chatRouter from './routes/chat.js';
import logger from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 4002;
const COMPANY_NAME = process.env.COMPANY_NAME || 'BT';

app.use(cors());
app.use(express.json());

const __dirnameResolved = path.resolve();
app.use(express.static(path.join(__dirnameResolved, '../client/public')));

app.use('/chat', chatRouter);

// Simple config endpoint for client branding
app.get('/config', (_req, res) => {
	res.json({ companyName: COMPANY_NAME });
});

app.get('*', (req, res) => res.sendFile(path.join(__dirnameResolved, '../client/public/index.html')));

app.listen(PORT, () => logger.info(`Agentic CX Demo server listening ${PORT} (company: ${COMPANY_NAME})`));
