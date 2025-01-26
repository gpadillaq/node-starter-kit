import "dotenv/config";
import { get } from "env-var";
import Options from "../types/env";

export const envs: Options = {
  PORT: get("PORT").required().asPortNumber(),
  JWT_SECRET: get("JWT_SECRET").required().asString(),
  POSTGRES_URL: get("POSTGRES_URL").required().asString() || "",
  NODE_ENV: get("NODE_ENV").required().asString(),

  MAILER_EMAIL: get("MAILER_EMAIL").required().asString(),
  MAILER_SECRET_KEY: get("MAILER_SECRET_KEY").required().asString(),
  MAILER_SERVICE: get("MAILER_SERVICE").required().asString(),
  WEBSERVICE_URL: get("WEBSERVICE_URL").required().asString(),
};
