import assert from "node:assert/strict";

const baseUrl = (process.env.BASE_URL || "http://localhost:3000").replace(/\/$/, "");
const request = (path, headers = {}) => fetch(`${baseUrl}${path}`, { headers, redirect: "manual" });

const html = await request("/");
assert.equal(html.status, 200, "homepage should return 200");
assert.match(html.headers.get("vary") || "", /accept/i, "HTML must vary by Accept");
const markdown = await request("/", { Accept: "text/markdown, text/html;q=0.8" });
assert.equal(markdown.status, 200, "markdown homepage should return 200");
assert.match(markdown.headers.get("content-type") || "", /^text\/markdown; charset=utf-8/i);
assert.match(markdown.headers.get("vary") || "", /accept/i, "Markdown must vary by Accept");
assert.match(await markdown.text(), /# Syed Mohammed Faham/);
const unsupported = await request("/", { Accept: "application/pdf" });
assert.equal(unsupported.status, 406, "unsupported explicit Accept should return 406");
const missing = await request("/path-that-does-not-exist", { Accept: "text/markdown" });
assert.equal(missing.status, 404, "missing path should return 404");
assert.match(missing.headers.get("content-type") || "", /^text\/markdown; charset=utf-8/i);
assert.match(await missing.text(), /# Page not found/);
for (const path of ["/about", "/contact", "/privacy", "/links", "/play", "/play/snake", "/llms.txt", "/robots.txt", "/sitemap.xml", "/sitemap-0.xml"]) {
  assert.equal((await request(path)).status, 200, `${path} should return 200`);
}
console.log(`Agent endpoint checks passed against ${baseUrl}`);
