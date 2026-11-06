import { createServer } from "node:http";
import worker from "../dist/server/index.js";

const args = process.argv.slice(2);
const valueAfter = (flag, fallback) => {
  const index = args.indexOf(flag);
  return index >= 0 && args[index + 1] ? args[index + 1] : fallback;
};
const port = Number(valueAfter("--port", "4173"));
const hostname = valueAfter("--host", "127.0.0.1");

const server = createServer(async (incoming, outgoing) => {
  try {
    const chunks = [];
    for await (const chunk of incoming) chunks.push(chunk);
    const headers = new Headers();
    for (const [key, value] of Object.entries(incoming.headers)) {
      if (Array.isArray(value)) value.forEach((item) => headers.append(key, item));
      else if (value != null) headers.set(key, value);
    }
    headers.set("x-hotelx-preview-user", "managed-preview-owner");
    headers.set("oai-authenticated-user-id", "managed-preview-owner");
    headers.set("oai-authenticated-user-email", "owner@hotelx.demo");
    headers.set("oai-authenticated-user-full-name", encodeURIComponent("Алексей Смирнов"));
    headers.set("oai-authenticated-user-full-name-encoding", "percent-encoded-utf-8");
    const host = incoming.headers.host || `${hostname}:${port}`;
    const request = new Request(`http://${host}${incoming.url || "/"}`, {
      method: incoming.method,
      headers,
      body: chunks.length ? Buffer.concat(chunks) : undefined
    });
    const response = await worker.fetch(request, { HOTELX_PLATFORM_OWNER_EMAIL: "owner@hotelx.demo", HOTELX_LOCAL_PREVIEW: "1" });
    outgoing.statusCode = response.status;
    response.headers.forEach((value, key) => outgoing.setHeader(key, value));
    outgoing.end(Buffer.from(await response.arrayBuffer()));
  } catch (error) {
    outgoing.statusCode = 500;
    outgoing.setHeader("content-type", "text/plain; charset=utf-8");
    outgoing.end(error instanceof Error ? error.message : "Preview failed");
  }
});

server.listen(port, hostname, () => {
  console.log(`HotelX preview listening on http://${hostname}:${port}`);
});
