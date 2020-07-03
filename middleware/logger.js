// Middleware
const logger = (req, res, next) => {
  console.log(`Requested => ${req.protocol}://${req.get('host')}${req.originalUrl}`);
  next();
};

module.exports = logger;