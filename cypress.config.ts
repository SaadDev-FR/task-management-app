import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'prps4y',
  e2e: {
    baseUrl: "http://localhost:4200", // Ensure Angular app is running on this port
    supportFile: "cypress/support/e2e.ts",
    video: false,
  },
});
