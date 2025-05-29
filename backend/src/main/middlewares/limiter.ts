import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  handler: (req, res) => {
    res.status(429).json({ error: 'You have reached the limit of requests per minute. Please, try again later.' });
  }
});
