/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CRM_WEBHOOK_URL?: string;
  readonly VITE_LEAD_API_URL?: string;
  readonly VITE_CRM_API_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
