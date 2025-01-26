interface Options {
  PORT: number;
  JWT_SECRET: string;
  POSTGRES_URL: string;
  NODE_ENV: string;
  MAILER_EMAIL: string;
  MAILER_SECRET_KEY: string;
  MAILER_SERVICE: string;
  WEBSERVICE_URL: string;
}

export default Options;
