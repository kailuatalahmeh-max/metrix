/// <reference types="vite/client" />

// Types for the variables in the .env file.
interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
