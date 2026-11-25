import { defineCloudflareConfig } from '@opennextjs/cloudflare';

// Sin caché incremental: todas las páginas son estáticas (se generan en la compilación).
export default defineCloudflareConfig();
