const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
  poolSize: 10,
  bufferMaxEntries: 0,
};

const DB_HOST = 'localhost'
const DB_NAME = 'PPP'
const DB_PORT = 27017

const dbConnectionURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

module.exports = {
  dbConnectionURL,
  options,
  DB_PORT,
  DB_NAME
}
