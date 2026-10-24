import { createApp } from './app.js';
import { config } from './config.js';

const app = createApp();

app.listen(config.port, () => {
  console.log(`🚀 Virtual Lab API server listening on http://localhost:${config.port}`);
  console.log(`📖 Swagger API Docs available at http://localhost:${config.port}/api-docs`);
});
