const envApiUrl = `${process.env.VUE_APP_PROTOCOL}://${process.env.VUE_APP_DOMAIN}`;

const env = process.env.NODE_ENV;

let tmpAppName = process.env.VUE_APP_NAME;
if (env === "development") {
  tmpAppName = `${tmpAppName} [dev]`;
} else if (env === "staging") {
  tmpAppName = `${tmpAppName} [staging]`;
}

export const apiUrl = `${envApiUrl}/api/v1`;
export const appName = tmpAppName;
