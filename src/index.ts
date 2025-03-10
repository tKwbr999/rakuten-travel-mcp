import { logger } from "./utils/logger";
import { config } from "./config";
import "./mcp/server"; // MCPサーバー起動

logger.info("Rakuten Travel MCP Server started");

if (!config.rakutenApplicationId) {
  logger.warn("RAKUTEN_APPLICATION_ID is not set in environment variables.");
}
