import { logger } from "./utils/logger";
import { config } from "./config";
import "./mcp/server"; // MCPサーバー起動

logger.info("Rakuten Travel MCP Server started");

if (!config.rakutenApiKey) {
  logger.warn("RAKUTEN_API_KEY is not set in environment variables.");
}
