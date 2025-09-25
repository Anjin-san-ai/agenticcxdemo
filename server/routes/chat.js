import express from 'express';
import axios from 'axios';
import logger from '../utils/logger.js';

const router = express.Router();

// POST /chat/send -> forwards to Athena Desktop external-chat endpoint
router.post('/send', async (req, res) => {
  const start = Date.now();
  const { customerId, message, athenaBaseUrl } = req.body || {};
  if (!customerId || !message || !athenaBaseUrl) {
    return res.status(400).json({ error: 'customerId, message, athenaBaseUrl required' });
  }
  try {
    const base = athenaBaseUrl.replace(/\/+$/, '');
    const url = `${base}/api/v1/external-chat`;
    logger.info('Forwarding to Athena', { url, customerId });
    const resp = await axios.post(url, { customerId, message }, { timeout: 12000 });
    logger.info('Athena replied', { status: resp.status, ms: Date.now() - start });
    res.json(resp.data);
  } catch (err) {
    logger.error('Forward failed', { msg: err.message, code: err.code, status: err.response?.status });
    const status = err.response?.status || 500;
    res.status(status).json({ error: err.message, code: err.code, status, raw: err.response?.data });
  }
});

export default router;
