import express from "express";
import { logger } from "../utils/logger";
import { hotelSearch } from "./functions";
import hotelSearchRequestSchema from "./schema/hotel_search_request.json" assert { type: "json" };
import hotelSearchResponseSchema from "./schema/hotel_search_response.json" assert { type: "json" };

const toolDefs = [
  {
    name: "hotel_search",
    description: "楽天APIでホテルを検索します",
    inputSchema: hotelSearchRequestSchema,
    outputSchema: hotelSearchResponseSchema,
  },
];

const toolFunctions = {
  hotel_search: hotelSearch,
};

const requestHandler = async (req: any) => {
  logger.info("MCP Request received", req);

  if (req.type === "list_tools") {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(toolDefs),
        },
      ],
    };
  } else if (req.type === "call_tool") {
    const { tool_name, arguments: args } = req;
    logger.info(`Calling tool ${tool_name} with arguments ${JSON.stringify(args)}`);

    if (tool_name === "hotel_search") {
      try {
        const result = await hotelSearch(args);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(result),
            },
          ],
        };
      } catch (error: any) {
        logger.error(`Error calling tool ${tool_name}: ${error.message}`);
        return {
          content: [
            {
              type: "text",
              text: `Error calling tool ${tool_name}: ${error.message}`,
            },
          ],
          isError: true,
        };
      }
    } else {
      return {
        content: [
          {
            type: "text",
            text: `Tool ${tool_name} not found`,
          },
        ],
        isError: true,
      };
    }
  } else {
    throw new Error(`Unknown request type: ${req.type}`);
  }
};

const errorHandler = (error: any) => {
  logger.error("MCP Error", error);
  return error;
};

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  try {
    const result = await requestHandler(req.body);
    res.json(result);
  } catch (error: any) {
    logger.error(`Error handling request: ${error.message}`);
    errorHandler(error);
    res.status(500).json({ error: error.message });
  }
});

const port = 3000;

app.listen(port, () => {
  logger.info(`MCP server listening on port ${port}`);
});
