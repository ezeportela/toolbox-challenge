function config() {
  const { env } = process;
  return {
    port: env.PORT || 8080,
    apiBaseUrl: env.API_BASE_URL || "",
    apiSecretKey: env.API_SECRET_KEY || "",
  };
}

module.exports = config;
