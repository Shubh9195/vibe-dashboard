import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { WebStandardStreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/webStandardStreamableHttp.js";

// We keep transport and server instances in global scope to ensure
// they survive Next.js Fast Refresh and retain their SSE connections
// between GET and POST requests.
const globalForMcp = globalThis as unknown as {
  mcpTransport: WebStandardStreamableHTTPServerTransport | undefined;
  mcpServer: Server | undefined;
};

let transport = globalForMcp.mcpTransport;
let server = globalForMcp.mcpServer;

if (!transport || !server) {
  transport = new WebStandardStreamableHTTPServerTransport({
    sessionIdGenerator: () => crypto.randomUUID(),
  });

  server = new Server(
    {
      name: "vibe-dashboard-mcp",
      version: "1.0.0",
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  // Initialize your MCP Server Tools/Resources here:
  // e.g.,
  // server.setRequestHandler(ListToolsRequestSchema, async () => { ... });
  // server.setRequestHandler(CallToolRequestSchema, async (req) => { ... });

  // Connect transport to the server
  server.connect(transport);

  globalForMcp.mcpTransport = transport;
  globalForMcp.mcpServer = server;
}

// Ensure this route handler doesn't default to edge, as MCP needs persistent memory
export const runtime = "nodejs";

export async function GET(req: Request) {
  return transport!.handleRequest(req);
}

export async function POST(req: Request) {
  return transport!.handleRequest(req);
}
