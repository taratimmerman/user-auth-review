const db = require('./api/data/dbConfig');

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
  });
  afterAll(async (done) => {
    await db.destroy();
    done();
  });