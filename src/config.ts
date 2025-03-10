import dotenv from "dotenv";

dotenv.config();

export const config = {
  rakutenApplicationId: process.env.RAKUTEN_APPLICATION_ID || "",
  mcpPort: process.env.MCP_PORT ? parseInt(process.env.MCP_PORT) : 3000,
};

if (!config.rakutenApplicationId) {
  console.warn("RAKUTEN_APPLICATION_ID is not set in environment variables.");
}
