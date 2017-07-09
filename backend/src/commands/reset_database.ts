import {APP_ENV, POSSIBLE_APP_ENVS} from 'src/config/environment';

if (APP_ENV === POSSIBLE_APP_ENVS.DEVELOPMENT) {
  require('dotenv').config();
}

import resetDatabase from 'src/util/database/reset_database';

resetDatabase();
