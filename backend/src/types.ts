export interface GoogleOAuthProfile {
  ageRange: {
    min: number;
  };
  circledByCount: number;
  cover: any;
  displayName: string;
  emails: Array<{value: string; type: string}>;
  etag: string;
  gender: string;
  id: string;
  isPlusUser: boolean;
  image: {
    url: string;
    isDefault: boolean;
  };
  kind: string;
  language: string;
  name: {
    familyName: string;
    givenName: string;
  };
  objectType: string;
  url: string;
  verified: boolean;
}
