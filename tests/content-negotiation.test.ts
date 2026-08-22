import { describe, expect, it } from "vitest";
import { appendVaryAccept, preferredType } from "../lib/content-negotiation.ts";

describe("content negotiation", () => {
  it("defaults to HTML when Accept is absent", () => {
    expect(preferredType(null)).toBe("text/html");
    expect(preferredType("")).toBe("text/html");
  });

  it("selects Markdown when it is preferred", () => {
    expect(
    preferredType("text/markdown, text/html;q=0.8"),
    ).toBe("text/markdown");
    expect(
    preferredType("text/html;q=0.2, text/markdown;q=0.9"),
    ).toBe("text/markdown");
  });

  it("selects HTML when it has the higher quality value", () => {
    expect(
    preferredType("text/markdown;q=0.5, text/html;q=0.9"),
    ).toBe("text/html");
  });

  it("honors specific rejections over wildcard acceptance", () => {
    expect(preferredType("text/markdown;q=0, */*;q=1")).toBe("text/html");
    expect(preferredType("text/html;q=0, text/markdown;q=0")).toBeNull();
  });

  it("returns null when neither supported representation is accepted", () => {
    expect(preferredType("application/pdf")).toBeNull();
  });

  it("adds Accept to Vary once while preserving existing directives", () => {
    const empty = new Headers();
    appendVaryAccept(empty);
    expect(empty.get("Vary")).toBe("Accept");

    const existing = new Headers({ Vary: "RSC, Accept-Encoding" });
    appendVaryAccept(existing);
    expect(existing.get("Vary")).toBe("RSC, Accept-Encoding, Accept");

    appendVaryAccept(existing);
    expect(existing.get("Vary")).toBe("RSC, Accept-Encoding, Accept");
  });
});
