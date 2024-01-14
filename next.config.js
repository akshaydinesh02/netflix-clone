/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    DATABASE_STRING: process.env.DATABASE_STRING,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,

    GITHUB_AUTH_APP_ID: process.env.GITHUB_AUTH_APP_ID,
    GITHUB_AUTH_CLIENT_ID: process.env.GITHUB_AUTH_CLIENT_ID,
    GITHUB_AUTH_CLIENT_SECRET: process.env.GITHUB_AUTH_CLIENT_SECRET,

    GOOGLE_AUTH_CLIENT_ID: process.env.GOOGLE_AUTH_CLIENT_ID,
    GOOGLE_AUTH_CLIENT_SECRET: process.env.GOOGLE_AUTH_CLIENT_SECRET,
  },
};

module.exports = nextConfig;
