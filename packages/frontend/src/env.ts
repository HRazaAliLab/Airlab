const env = process.env.VUE_APP_ENV;

let envApiUrl = "";

if (env === "production") {
  envApiUrl = `http://${process.env.VUE_APP_DOMAIN_PROD}`;
} else if (env === "staging") {
  envApiUrl = `http://${process.env.VUE_APP_DOMAIN_STAG}`;
} else {
  envApiUrl = `http://${process.env.VUE_APP_DOMAIN_DEV}`;
}

export const apiUrl = `${envApiUrl}/api/v1`;
export const appName = process.env.VUE_APP_NAME;