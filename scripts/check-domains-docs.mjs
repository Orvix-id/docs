import { readFileSync } from "node:fs";

const english = readFileSync("content/docs/domains.mdx", "utf8");
const indonesian = readFileSync("content/docs/id/domains.mdx", "utf8");
const navigation = readFileSync("content/docs/meta.json", "utf8");

const required = [
  "https://api.orvix.id",
  "domains:read",
  "/v1/domains/availability",
  "/v1/domains/pricing",
  "registrationPrice",
  "renewalPrice",
  "apiOrderAvailable",
  "x-request-id",
  "```js",
  "```ts",
  "```python",
];

for (const value of required) {
  if (!english.includes(value) || !indonesian.includes(value)) {
    throw new Error(`Domains documentation is missing ${value}`);
  }
}

if (!navigation.includes('"domains"') || !navigation.includes('"id/domains"')) {
  throw new Error("Domains pages are missing from navigation");
}

console.log("Domains documentation contract passed");
