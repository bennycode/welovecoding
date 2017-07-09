import {APP_ENV, POSSIBLE_APP_ENVS} from 'config/environment';

if (APP_ENV === POSSIBLE_APP_ENVS.DEVELOPMENT) {
  require('dotenv').config();
}

import resetDatabase from 'util/database/reset_database';

resetDatabase();
