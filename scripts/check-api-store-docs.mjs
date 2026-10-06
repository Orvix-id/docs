import { readFileSync } from "node:fs";

const english = readFileSync("content/docs/api-store.mdx", "utf8");
const indonesian = readFileSync("content/docs/id/api-store.mdx", "utf8");
const navigation = readFileSync("content/docs/meta.json", "utf8");

const required = [
  "api_store:all",
  "regions:read",
  "schools:read",
  "holidays:read",
  "bmkg:read",
  "kbli:read",
  "/v1/regions/provinces",
  "/v1/schools",
  "/v1/holidays",
  "/v1/bmkg/earthquakes/latest",
  "/v1/kbli/categories",
  '"page_size"',
  '"total_items"',
  '"upstream"',
  "info_gempa",
  "```js",
  "```ts",
  "```python",
];

for (const value of required) {
  if (!english.includes(value) || !indonesian.includes(value)) {
    throw new Error(`API Store documentation is missing ${value}`);
  }
}

if (!navigation.includes('"api-store"') || !navigation.includes('"id/api-store"')) {
  throw new Error("API Store pages are missing from navigation");
}

console.log("API Store documentation contract passed");
