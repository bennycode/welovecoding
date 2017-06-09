export interface GoogleOAuthProfile {
  kind: string;
  etag: string;
  gender: string;
  emails: Array<{value: string; type: string}>;
  objectType: string;
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  url: string;
  image: {
    url: string;
    isDefault: boolean;
  };
  isPlusUser: boolean;
  language: string;
  ageRange: {
    min: number;
  };
  circledByCount: number;
  verified: boolean;
  cover: any;
}
