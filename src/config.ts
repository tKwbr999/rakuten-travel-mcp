import dotenv from "dotenv";

dotenv.config();

export const config = {
  rakutenApiKey: process.env.RAKUTEN_API_KEY || "",
  mcpPort: process.env.MCP_PORT ? parseInt(process.env.MCP_PORT) : 3000,
};

if (!config.rakutenApiKey) {
  console.warn("RAKUTEN_API_KEY is not set in environment variables.");
}
