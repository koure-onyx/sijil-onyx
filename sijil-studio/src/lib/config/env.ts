const requiredEnv = {
  NEXT_PUBLIC_API_BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL,
};

Object.entries(requiredEnv).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
});

export const env = {
  apiBaseUrl:
    requiredEnv.NEXT_PUBLIC_API_BASE_URL,
};
