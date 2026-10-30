import { readdirSync, readFileSync } from "node:fs";

const readSection = (dir) =>
  readdirSync(dir)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => readFileSync(`${dir}/${name}`, "utf8"))
    .join("\n");

const english = readSection("content/docs/api-store");
const indonesian = readSection("content/docs/id/api-store");
const navigation = readFileSync("content/docs/meta.json", "utf8");

const pages = [
  "index",
  "regional-indonesia",
  "schools-indonesia",
  "national-holidays",
  "bmkg-indonesia",
  "kbli-indonesia",
  "nik-parser-indonesia",
  "hospitals-indonesia",
  "universities-indonesia",
  "cv-extractor",
  "ktp-ocr",
  "npwp-ocr",
];

const required = [
  "api_store:all",
  "regions:read",
  "schools:read",
  "holidays:read",
  "bmkg:read",
  "kbli:read",
  "nik:read",
  "hospitals:read",
  "universities:read",
  "cv:extract",
  "ktp:extract",
  "npwp:extract",
  "/v1/regions/provinces",
  "/v1/schools",
  "/v1/holidays",
  "/v1/bmkg/earthquakes/latest",
  "/v1/kbli/categories",
  "/v1/nik/parse",
  "/v1/nik/parse-batch",
  "/v1/hospitals",
  "/v1/universities",
  "/v1/cv/extract",
  "/v1/ktp/extract",
  "/v1/npwp/extract",
  '"structurally_valid"',
  '"kota_kabupaten"',
  "nik_invalid_format",
  "rolling_century",
  '"page_size"',
  '"total_items"',
  '"upstream"',
  "info_gempa",
  "Rp300",
  "daily_limit_exceeded",
  "too_many_rejected_images",
  "Retry-After",
  "insufficient_balance",
  '"needs_review"',
  "```js",
  "```ts",
  "```python",
];

for (const value of required) {
  if (!english.includes(value) || !indonesian.includes(value)) {
    throw new Error(`API Store documentation is missing ${value}`);
  }
}

for (const dir of ["content/docs/api-store", "content/docs/id/api-store"]) {
  const meta = JSON.parse(readFileSync(`${dir}/meta.json`, "utf8"));
  for (const page of pages) {
    if (!meta.pages.includes(page))
      throw new Error(`${dir}/meta.json is missing ${page}`);
    readFileSync(`${dir}/${page}.mdx`, "utf8");
  }
}

if (
  !navigation.includes('"api-store"') ||
  !navigation.includes('"id/api-store"')
) {
  throw new Error("API Store pages are missing from navigation");
}

console.log("API Store documentation contract passed");
