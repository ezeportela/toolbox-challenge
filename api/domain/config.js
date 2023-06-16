function config() {
  const { env } = process;
  return {
    port: env.PORT || 8080,
    secretKey: env.API_SECRET_KEY || "",
  };
}

module.exports = config;
