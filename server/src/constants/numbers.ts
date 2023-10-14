export const CommonNumbers = {
  zero: 0,
  one: 1,
  // JWT token expires in seconds, 30 Days
  jwtExpiresIn: 60 * 60 * 24 * 30,
  maxOTP: 9999,
  // In milliseconds, 5 Mins
  resetPasswordTokenExpiresIn: 5 * 60 * 1000,
  // 2 Aws signed key expires in 5 Mins
  awsPresignedKeyExpiresIn: 5 * 60,
};
