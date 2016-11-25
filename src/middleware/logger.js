export default logger => (req, res, next) => {
  logger.trace(`${req.method} ${req.url}`);
  next();
};
