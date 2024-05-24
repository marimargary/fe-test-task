import Header from "./Components/Header.tsx";
import { expect, test } from "vitest";

test("Header component is exported", () => {
  expect(Header).toBeDefined();

  const header = Header();
  expect(header.type).toBe("div");

  console.log("Header type:", header.type);
});
