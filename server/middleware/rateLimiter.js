const rateLimit = {};

export const rateLimitMiddleware = (maxRequests = 5, windowMs = 60000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!rateLimit[ip]) {
      rateLimit[ip] = [];
    }

    rateLimit[ip] = rateLimit[ip].filter(timestamp => now - timestamp < windowMs);

    if (rateLimit[ip].length >= maxRequests) {
      return res.status(429).json({
        success: false,
        error: 'Too many requests. Please try again later.'
      });
    }

    rateLimit[ip].push(now);
    next();
  };
};

export default rateLimitMiddleware;
