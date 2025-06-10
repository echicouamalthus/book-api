import { serve } from "@hono/node-server";

import app from "@/src/app";
import env from "@/src/env";

console.log(`Server is running on port http://localhost:${env.PORT}/api`);

serve({
  fetch: app.fetch,
  port: env.PORT,
});
