export const queryKeys = {
  auth: {
    profile: ["auth", "profile"] as const,
  },

  platform: {
    stats: ["platform", "stats"] as const,
  },

  documents: {
    all: ["documents"] as const,
    detail: (id: string) =>
      ["documents", id] as const,
  },
};
