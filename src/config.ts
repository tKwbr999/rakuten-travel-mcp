import dotenv from "dotenv";

dotenv.config();

export const config = {
  rakutenApiKey: process.env.RAKUTEN_API_KEY,
};

if (!config.rakutenApiKey) {
  console.warn("RAKUTEN_API_KEY is not set in environment variables.");
}
