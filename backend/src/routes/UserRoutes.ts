import {Router} from 'express';
import * as cors from 'cors';
import * as passport from 'passport';

import User from 'src/models/User';

import {PlusScopes, YouTubeScopes} from 'src/services/google/oauth';
import {authenticateUserById, verifyToken, generateToken} from 'src/controllers/UserController';

const router: Router = Router();

/**
 * Local Authentication via username + password
 * curl --data "username=tom&password=mypassword" http://localhost:8080/auth/local
 */
router.options('/auth/local', cors());
router.post('/auth/local', cors(), function(req, res, next) {
  return passport.authenticate(
    'local',
    {
      session: false,
    },
    function(error, user: User, info) {
      if (error) {
        console.log('AUTH ERROR', error);
        return next(error);
      }
      if (!user) {
        return res.json({success: false, message: info.message});
      }
      return authenticateUserById(user.id).then(json => res.json(json));
    },
  )(req, res, next);
});

/**
 * Check if a token is valid
 */
router.options('/auth/token', cors());
router.get('/auth/token', cors(), function(req, res) {
  const token = req.headers.token as string;
  verifyToken(token)
    .then(decoded => {
      return authenticateUserById(decoded.id, token).then(json => res.json(json));
    })
    .catch(err => {
      console.log('JWT error: ', err);
      res.json({success: false});
    });
});

/**
 * Google Authentication
 */
router.get(
  '/auth/google',
  passport.authenticate(
    'google',
    {
      scope: [
        PlusScopes.USERINFO_EMAIL,
        PlusScopes.USERINFO_PROFILE,
        YouTubeScopes.YOUTUBE_READONLY,
      ],
      session: false,
    },
    function(error) {
      // TODO: improve error handling
      if (error) {
        console.log('GOOGLE AUTH ERROR', error);
      }
    },
  ),
  function(req, res) {
    return res.json({
      success: false,
    });
  },
);

/**
 * Google Callback for a successfull Authentication
 */
router.get('/auth/google/callback', function(req, res, next) {
  passport.authenticate('google', {}, function(error, user: User) {
    // TODO: improve error handling
    const token = generateToken(user);
    if (error) {
      console.log('GOOGLE AUTH CALLBACK ERROR', error);
      res.redirect(`${process.env.APP_URL_FRONTEND}/auth/google/failure`);
    } else {
      res.redirect(
        `${process.env.APP_URL_FRONTEND}/auth/google/success?token=${token}`,
      );
    }
    next();
  })(req, res, next);
});

export default router;
