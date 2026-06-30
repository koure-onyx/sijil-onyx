export const endpoints = {
  auth: {
    login: "/auth/login",
    logout: "/auth/logout",
    profile: "/auth/profile",
  },

  platform: {
    stats: "/platform/stats",
  },

  documents: {
    list: "/documents",
  },
} as const;
