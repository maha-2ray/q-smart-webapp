const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = import.meta.env[key];

  if (!value && !defaultValue) {
    if (import.meta.env.DEV) {
      console.warn(`Environment variable ${key} is not set`);
    }
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value || defaultValue || "";
};

export const config = {
  apiBaseUrl: getEnvVar("VITE_API_BASE_URL", "https://api.dev.qsmart.com/v1"),
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
  appName: import.meta.env.VITE_APP_NAME || "QSMART WebApp",
  appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",
} as const;
