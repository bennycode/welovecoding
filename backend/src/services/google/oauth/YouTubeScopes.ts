// tslint:disable-next-line:max-line-length
// https://developers.google.com/identity/protocols/googlescopes#youtubev3
// https://developers.google.com/resources/api-libraries/documentation/youtube/v3/java/latest/com/google/api/services/youtube/YouTubeScopes.html
export default class YouTubeScopes {
  // Manage your YouTube account
  public static YOUTUBE = 'https://www.googleapis.com/auth/youtube';
  // Manage your YouTube account
  public static YOUTUBE_SSL = 'https://www.googleapis.com/auth/youtube.force-ssl';
  // View your YouTube account
  public static YOUTUBE_READONLY = 'https://www.googleapis.com/auth/youtube.readonly';
  // Manage your YouTube videos
  public static YOUTUBE_UPLOAD = 'https://www.googleapis.com/auth/youtube.upload';
  // View and manage your assets and associated content on YouTube
  public static YOUTUBEPARTNER = 'https://www.googleapis.com/auth/youtubepartner';
  // View private information of your YouTube channel relevant during the audit process with a YouTube partner
  public static YOUTUBEPARTNER_CHANNEL_AUDIT = 'https://www.googleapis.com/auth/youtubepartner-channel-audit';
}
