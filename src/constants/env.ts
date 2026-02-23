export const ENV = {
  MODE: import.meta.env.MODE as "development" | "production",

  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
  IS_SSR: import.meta.env.SSR,

  API_URL: import.meta.env.VITE_API_URL,
} as const
