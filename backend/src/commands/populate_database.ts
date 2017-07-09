import {APP_ENV, POSSIBLE_APP_ENVS} from 'src/config/environment';

if (APP_ENV === POSSIBLE_APP_ENVS.DEVELOPMENT) {
  require('dotenv').config();
}

import {populateAll} from 'src/util/database/populate_database';

populateAll();
