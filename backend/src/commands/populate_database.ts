import {APP_ENV, POSSIBLE_APP_ENVS} from 'config/environment';

if (APP_ENV === POSSIBLE_APP_ENVS.DEVELOPMENT) {
  require('dotenv').config();
}

import {populateAll} from 'util/database/populate_database';

populateAll();
