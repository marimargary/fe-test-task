import "dotenv/config";
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    env: {
      apiUrl: process.env.CYPRESS_API_URL,
      baseUrl: process.env.CYPRESS_BASE_URL,
    },
  },
});
