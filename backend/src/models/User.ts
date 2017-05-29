import {Table, Column, Model} from 'sequelize-typescript';
import * as util from 'util';
import * as crypto from 'crypto';
import * as _ from 'lodash';
import {Strategy} from 'passport-local';

const LocalStrategy = Strategy;

// The default option values
const defaultAttachOptions = {
    selectFields: false,
    activationkeylen:  8,
    resetPasswordkeylen:  8,
    saltlen:  32,
    iterations:  12000,
    keylen:  512,
    digest:  'sha1',
    usernameField: 'username',
    usernameLowerCase: false,
    activationRequired: false,
    hashField: 'hash',
    saltField: 'salt',
    activationKeyField: 'activationKey',
    resetPasswordKeyField: 'resetPasswordKey',
    incorrectPasswordError: 'Incorrect password',
    incorrectUsernameError: 'Incorrect username',
    invalidActivationKeyError: 'Invalid activation key',
    invalidResetPasswordKeyError: 'Invalid reset password key',
    missingUsernameError: 'Field %s is not set',
    missingFieldError: 'Field %s is not set',
    missingPasswordError: 'Password argument not set!',
    userExistsError: 'User already exists with %s',
    activationError: 'Email activation required',
    noSaltValueStoredError: 'Authentication not possible. No salt value stored in db!'
};
const options = defaultAttachOptions;

/**
 * Initially this table had the fields:
 * - ID            BIGINT(20)
 * - ADMIN         TINYINT(1)
 * - CREATED       DATETIME
 * - EMAIL         VARCHAR(255)
 * - LASTMODIFIED  DATETIME
 * - NAME          VARCHAR(255)
 * - SLUG          VARCHAR(255)
 * - CREATOR_ID    BIGINT(20)
 * - LASTEDITOR_ID BIGINT(20)
 */



@Table({
  timestamps: true
})
class User extends Model<User> {
  @Column({
    allowNull: false
  })
  email: string;

  @Column({
    allowNull: false
  })
  username: string;

  @Column
  hash: string;

  @Column
  salt: string;

  @Column
  activationKey: string;

  @Column
  resetPasswordKey: string;

  @Column
  verified: boolean;

  setPassword (password, cb) {
    if (!password) {
      return cb(new Error(options.missingPasswordError));
    }

    const self = this;

    crypto.randomBytes(options.saltlen, function (err, buf) {
      if (err) {
        return cb(err);
      }

      const salt = buf.toString('hex');

      crypto.pbkdf2(password, salt, options.iterations, options.keylen, options.digest, function (err, hashRaw) {
        if (err) {
          return cb(err);
        }

        // TODO: type
        self.set(options.hashField, new Buffer(hashRaw as any as string, 'binary').toString('hex'));
        self.set(options.saltField, salt);

        cb(null, self);
      });
    });
  }

  setActivationKey (cb) {

    const self = this;

    if (!options.activationRequired) {
      return cb(null, self);
    }

    crypto.randomBytes(options.activationkeylen, function (err, buf) {
      if (err) {
        return cb(err);
      }

      const randomHex = buf.toString('hex');
      self.set(options.activationKeyField, randomHex);
      cb(null, self);
    });
  }

  authenticate (password, cb) {
    const self = this;

    // prevent to throw error from crypto.pbkdf2
    if (!this.get(options.saltField)) {
      return cb(null, false, { message: options.noSaltValueStoredError });
    }

    crypto.pbkdf2(password, this.get(options.saltField), options.iterations, options.keylen, options.digest, function (err, hashRaw) {
      if (err) {
        return cb(err);
      }

      // TODO types
      const hash = new Buffer(hashRaw as any as string, 'binary').toString('hex');

      if (hash === self.get(options.hashField)) {
        return cb(null, self);
      } else {
        return cb(null, false, { message: options.incorrectPasswordError });
      }
    });
  }

  static authenticate () {
    const self = User;
    return function (username, password, cb) {
      self.findByUsername(username, function (err, user) {
        if (err) { return cb(err); }

        if (user) {
          return user.authenticate(password, cb);
        } else {
          return cb(null, false, { message: options.incorrectUsernameError });
        }
      });
    };
  }

  static serializeUser () {
    return function (user, cb) {
      cb(null, user.get(options.usernameField));
    };
  }

  static deserializeUser () {
    const self = User;
    return function (username, cb) {
      self.findByUsername(username, cb);
    };
  }

  static register (user, password, cb) {
    const self = User,
      fields = {};
    // TODO: check this
    if (user instanceof User) {
      // Do nothing
    } else if (_.isString(user)) {
      // Create an instance of this in case user is passed as username
      fields[options.usernameField] = user;

      user = self.build(fields);
    } else if (_.isObject(user)) {
      // Create an instance if user is passed as fields
      user = self.build(user);
    }

    if (!user.get(options.usernameField)) {
      return cb(new Error(util.format(options.missingUsernameError, options.usernameField)));
    }

    self.findByUsername(user.get(options.usernameField), function (err, existingUser) {
      if (err) { return cb(err); }

      if (existingUser) {
        return cb(new Error(util.format(options.userExistsError, user.get(options.usernameField))));
      }

      user.setPassword(password, function (err, user) {
        if (err) {
          return cb(err);
        }

        user.setActivationKey(function (err, user) {
          if (err) {
            return cb(err);
          }

          user.save()
          .then(function() {
            cb(null, user);
          })
          .catch(function (err) {
            return cb(err);
          });

        });

      });
    });
  }

  static activate (username, password, activationKey, cb) {
      const self = User;
      const auth = self.authenticate();
      auth(username, password, function (err, user, info) {

        if (err) { return cb(err); }

        if (!user) { return cb(info); }

        if (user.get(options.activationKeyField) === activationKey) {
          user.updateAttributes({ verified: true, activationKey: 'null' })
          .then(function() {
            return cb(null, user);
          })
          .catch(function (err) {
            return cb(err);
          });
        } else {
          return cb({ message: options.invalidActivationKeyError });
        }
      });
  }

  static findByUsername (username, cb) {
      console.log('hey, find by username');
      const queryParameters = {};

      // if specified, convert the username to lowercase
      if (options.usernameLowerCase) {
        username = username.toLowerCase();
      }

      queryParameters[options.usernameField] = username;

      const query = this.find({ where: queryParameters });
      query.then(function (user) {
        cb(null, user);
      });
      query.catch(function (err) {
        cb(err);
      });
  };

  static setResetPasswordKey (username, cb) {
      const self = User;
      self.findByUsername(username, function (err, user) {
        if (err) { return cb(err); }
        if (!user) { return cb({ message: options.incorrectUsernameError }); }

        crypto.randomBytes(options.resetPasswordkeylen, function (err, buf) {
          if (err) { return cb(err); }
          const randomHex = buf.toString('hex');
          user.set(options.resetPasswordKeyField, randomHex);
          user.save()
          .then(function() {
            return cb(null, user);
          })
          .catch(function (err) {
            return cb(err);
          });
        });
      });
  };

  static resetPassword (username, password, resetPasswordKey, cb) {
    const self = User;
    self.findByUsername(username, function (err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb({ message: options.incorrectUsernameError }); }
      if (user.get(options.resetPasswordKeyField) === resetPasswordKey) {
        user.setPassword(password, function (err, user) {
          if (err) { return cb(err); }
          user.set(options.resetPasswordKeyField, null);
          user.save()
          .then(function() {
            cb(null, user);
          })
          .catch(function (err) {
            return cb(err);
          });
        });
      } else {
        return cb({ message: options.invalidResetPasswordKeyError });
      }
    });
  };

  static createStrategy () {
      return new LocalStrategy(options, User.authenticate());
  };

};

export default User;
