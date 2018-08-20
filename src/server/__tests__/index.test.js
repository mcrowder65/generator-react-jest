import { fetchGet } from "shared/fetch-wrapper";

test("hitting /ping should return 'The server says hello'", async () => {
  const server = require("server/index");
  const result = await fetchGet({ url: "http://localhost:3000/ping" });
  expect(result).toEqual("The server says hello");
  server.default.close();
});
