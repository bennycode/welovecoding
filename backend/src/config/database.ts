import {ISequelizeConfig} from 'sequelize-typescript';
import {APP_ENV, POSSIBLE_APP_ENVS} from 'src/config/environment';

const POSTGRES_URL_REGEX = /postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/;

// 'postgres://welovecodinguser:wlc2017@localhost:8675/welovecoding'
function getConfigFromUrl(url: string) {
  if (url === undefined) {
    return {
      username: '',
      password: '',
      port: 0,
      name: '',
    };
  }
  const [, username, password, host, port, name] = url.match(POSTGRES_URL_REGEX);
  return {
    username,
    password,
    host,
    port: Number(port),
    name,
  };
}

const dev: ISequelizeConfig = {
  pool: {
    max: 5,
    min: 0,
    idle: 1000,
  },
  dialect: 'postgres',
  protocol: 'postgres',
  username: 'welovecodinguser',
  password: 'wlc2017',
  host: '127.0.0.1',
  port: 5432,
  name: 'welovecoding',
};

const production: ISequelizeConfig = {
  pool: {
    max: 5,
    min: 0,
    idle: 1000,
  },
  dialect: 'postgres',
  protocol: 'postgres',
  ...getConfigFromUrl(process.env.DATABASE_URL),
  dialectOptions: {
    ssl: true,
  },
};

export const databaseConfigs = {
  [POSSIBLE_APP_ENVS.DEVELOPMENT]: dev,
  [POSSIBLE_APP_ENVS.PRODUCTION]: production,
};

export default databaseConfigs[APP_ENV];
