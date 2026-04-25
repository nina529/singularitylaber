import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const pages = [
  "index.html",
  "studio.html",
  "services.html",
  "monetization.html",
  "contact.html",
  "privacy.html",
  "support.html",
];

function read(page) {
  return fs.readFileSync(path.join(root, page), "utf8");
}

for (const page of pages) {
  test(`${page} exists`, () => {
    assert.equal(fs.existsSync(path.join(root, page)), true);
  });
}

test("all pages include a title tag", () => {
  for (const page of pages) {
    assert.match(read(page), /<title>.+<\/title>/i);
  }
});

test("all pages include shared CSS and JS assets", () => {
  for (const page of pages) {
    const html = read(page);
    assert.match(html, /assets\/css\/styles\.css/i);
    assert.match(html, /assets\/js\/site\.js/i);
  }
});

test("all pages include privacy and support links", () => {
  for (const page of pages) {
    const html = read(page);
    assert.match(html, /href="privacy\.html"/i);
    assert.match(html, /href="support\.html"/i);
  }
});

test("homepage presents the studio as iOS and IAA focused", () => {
  const html = read("index.html");
  assert.match(html, /SingularityLaber/i);
  assert.match(html, /iOS software development/i);
  assert.match(html, /iOS casual games/i);
  assert.match(html, /IAA monetization/i);
});

test("navigation links to all core pages", () => {
  const html = read("index.html");
  assert.match(html, /href="studio\.html"/i);
  assert.match(html, /href="services\.html"/i);
  assert.match(html, /href="monetization\.html"/i);
  assert.match(html, /href="contact\.html"/i);
  assert.match(html, /href="privacy\.html"/i);
  assert.match(html, /href="support\.html"/i);
});

test("services page lists the core service lines", () => {
  const html = read("services.html");
  assert.match(html, /iOS app development/i);
  assert.match(html, /iOS game development/i);
  assert.match(html, /IAA advertising monetization/i);
});

test("monetization page explains the IAA framework", () => {
  const html = read("monetization.html");
  assert.match(html, /IAA Strategy|IAA System Design/i);
  assert.match(html, /placement strategy/i);
  assert.match(html, /mediation/i);
  assert.match(html, /retention/i);
});

test("contact page includes all provided contact addresses", () => {
  const html = read("contact.html");
  assert.match(html, /support@singularitylaber\.com/i);
  assert.match(html, /bussiness@singularitylaber\.com/i);
  assert.match(html, /nina@myskyrs\.com/i);
});

test("support page includes support guidance and FAQ language", () => {
  const html = read("support.html");
  assert.match(html, /Support Guidance/i);
  assert.match(html, /Frequently Asked Questions/i);
  assert.match(html, /support@singularitylaber\.com/i);
});

test("privacy page includes detailed privacy sections", () => {
  const html = read("privacy.html");
  assert.match(html, /Privacy Policy/i);
  assert.match(html, /Information We Collect/i);
  assert.match(html, /Data Retention/i);
  assert.match(html, /International Transfers/i);
  assert.match(html, /Your Rights/i);
  assert.match(html, /Device Permissions/i);
  assert.match(html, /Third-Party Services/i);
  assert.match(html, /IAA Advertising and Analytics/i);
});
