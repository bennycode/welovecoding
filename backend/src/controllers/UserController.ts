import * as jwt from 'jsonwebtoken';

import User from 'src/models/User';

const SECRET = 'mycoolsecret';

export function generateToken(user: User) {
  return jwt.sign(
    {
      id: user.id,
    } as object,
    SECRET,
    {
      expiresIn: '120 minutes',
    },
  );
}

export function verifyToken(token): Promise<{id: number}> {
  return new Promise(function(resolve, reject) {
    jwt.verify(token, SECRET, (err, decoded: {id: number}) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(decoded);
    });
  });
}

export function authenticateUserById(id, token?) {
  return User.findById(id)
    .then((user: User) => {
      return {
        success: true,
        data: {
          email: user.email,
          username: user.username,
          token: token || generateToken(user),
        },
      };
    });
}
