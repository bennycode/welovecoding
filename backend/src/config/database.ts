import {ISequelizeConfig} from 'sequelize-typescript';
import {APP_ENV, POSSIBLE_APP_ENVS} from 'config/environment';

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
  const [, username, password, host, port, name] = url.match(
    POSTGRES_URL_REGEX,
  );
  return {
    username,
    password,
    host,
    port: Number(port),
    name,
  };
}

const development: ISequelizeConfig = {
  pool: {
    max: 5,
    min: 0,
    idle: 1000,
  },
  dialect: 'postgres',
  protocol: 'postgres',
  ...getConfigFromUrl(process.env.DATABASE_URL),
};

const testing: ISequelizeConfig = {
  username: 'welovecodinguser',
  name: 'welovecoding',
  password: 'wlc2017',
  dialect: 'sqlite',
  storage: './database.sqlite',
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
  [POSSIBLE_APP_ENVS.DEVELOPMENT]: development,
  [POSSIBLE_APP_ENVS.PRODUCTION]: production,
  [POSSIBLE_APP_ENVS.TESTING]: testing,
};

export default databaseConfigs[APP_ENV];
