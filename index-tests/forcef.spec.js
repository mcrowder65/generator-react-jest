import { executeBashFunction, cli, doesFileExist } from "./utils.js";

test("When forcef exists and you pass -f, it should delete it and work!", async () => {
  const folder = "forcef";
  await executeBashFunction(`rm -rf ${folder} && mkdir ${folder}`);
  process.argv.push(folder);
  process.argv.push("-f");
  process.argv.push("-s");
  await cli();
  expect(await doesFileExist(folder)).toBeTruthy();
});