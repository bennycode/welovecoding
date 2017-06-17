import {APP_ENV, POSSIBLE_APP_ENVS} from 'src/config/environment';

if (APP_ENV === POSSIBLE_APP_ENVS.DEVELOPMENT) {
  require('dotenv').config();
}

/**
 * DROP ALL TABLES AND CREATE THEM AGAIN
 */
import sequelize from 'src/models';

console.log('RESETTING DATABASE!');
sequelize.sync({force: true});
