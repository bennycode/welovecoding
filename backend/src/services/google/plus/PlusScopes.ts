// tslint:disable-next-line:max-line-length
// https://developers.google.com/identity/protocols/googlescopes#oauth2v2
// https://developers.google.com/resources/api-libraries/documentation/plus/v1/java/latest/com/google/api/services/plus/PlusScopes.html
export default class PlusScopes {
  // Know the list of people in your circles, your age range, and language
  public static PLUS_LOGIN = 'https://www.googleapis.com/auth/plus.login';
  // 	Know who you are on Google
  public static PLUS_ME = 'https://www.googleapis.com/auth/plus.me';
  // 	View your email address
  public static USERINFO_EMAIL = 'https://www.googleapis.com/auth/userinfo.email';
  // View your basic profile info
  public static USERINFO_PROFILE = 'https://www.googleapis.com/auth/userinfo.profile';
}
