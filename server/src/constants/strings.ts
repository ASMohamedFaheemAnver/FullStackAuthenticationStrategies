export const EnvKeys = {
  JWT_SECRET: 'JWT_SECRET',
  MONGODB_URI: 'MONGODB_URI',
  GOOGLE_CLIENT_ID: 'GOOGLE_CLIENT_ID',
  GOOGLE_CLIENT_SECRET: 'GOOGLE_CLIENT_SECRET',
  GOOGLE_CALLBACK_URL: 'GOOGLE_CALLBACK_URL',
};

export const PassportAuthStrategies = {
  jwt: 'jwt',
  firebaseJwt: 'firebase-jwt',
  google: 'google',
  googleCustom: 'google-custom',
};

export const PassportAuthStrategyKeys = {
  roles: 'roles',
};

export const FilePaths = {
  firebaseAdminKey: './serviceAccountKey.json',
};
