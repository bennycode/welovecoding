export default {
  name: 'welovecoding',
  username: 'welovecodinguser',
  password: 'wlc2017',
  pool: {
    max: 5,
    min: 0,
    idle: 10000,
  },
  // sqlite
  dialect: 'sqlite',
  storage: './database.sqlite',

  // mysql
  // dialect: 'mysql',
  host: '127.0.0.1',
  port: 3306,
};
