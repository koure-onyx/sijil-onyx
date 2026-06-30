import {
  DefaultOptions,
} from "@tanstack/react-query";

export const queryDefaults: DefaultOptions = {
  queries: {
    retry: 2,
    staleTime: 60_000,
    gcTime: 300_000,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  },

  mutations: {
    retry: 1,
  },
};
