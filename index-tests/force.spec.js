import { executeBashFunction, cli } from "./utils.js";

test("When force exists, it should reject", async () => {
  try {
    const folder = "force";
    await executeBashFunction(`rm -rf ${folder} && mkdir ${folder}`);
    process.argv.push(folder);
    await cli();
  } catch (e) {
    expect(e.message.indexOf("file already exists")).toBeGreaterThan(-1);
  }
});
