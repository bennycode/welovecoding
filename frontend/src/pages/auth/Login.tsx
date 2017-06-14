import * as React from 'react';
import CONFIG from 'src/config';

export default function Login() {
  return (
    <div>
      <h1>{'Login'}</h1>
      <a href={CONFIG.API.AUTH_GOOGLE_LOGIN}>{'Login with Google'}</a>
      <h2>{'Login with username/password'}</h2>
      <form method="post" action={CONFIG.API.AUTH_LOCAL_LOGIN}>
        <label for="username">{'Username'}</label>
        <input id="username" type="text" name="username" />
        <label for="password">{'Password'}</label>
        <input id="password" type="password" name="password" />
        <button type="submit">{'Submit'}</button>
      </form>
    </div>
  );
}
