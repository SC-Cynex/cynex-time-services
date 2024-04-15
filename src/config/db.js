const host = process.env.MYSQL_DB_HOST;
const user = process.env.MYSQL_DB_USER;
const password = process.env.MYSQL_DB_PASSWORD;
const database = process.env.MYSQL_DB_DATABASE;

const Sequelize = require('sequelize');

const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Successfull connection to the database.');
  })
  .catch(err => {
    console.error('Error', err);
  });

module.exports = sequelize;