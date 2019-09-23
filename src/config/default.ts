/**
 * Shared configuration values should be here.
 */
export default {
  domainName: 'localhost',
  databaseType: 'postgres',
  databaseHost: 'localhost',
  databasePort: 5432,
  databaseName: 'nest_boilerplate',
  databaseUsername: 'postgres',
  databasePassword: 'postgres',
  rateLimiter: {
    windowMs: 15 * 60 * 1000,
    maxRequest: 100,
  },
};
