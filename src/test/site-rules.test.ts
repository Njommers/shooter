import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";
import { filterPhotos, photos, site, whatsappLink } from "@/lib/site";

describe("contact form rules", () => {
  it("requires a name", () => {
    expect(contactSchema.safeParse({ name: " ", email: "a@b.co", message: "hi" }).success).toBe(false);
  });
  it("rejects an invalid email", () => {
    expect(contactSchema.safeParse({ name: "Thandi", email: "nope", message: "hi" }).success).toBe(false);
  });
  it("requires a message", () => {
    expect(contactSchema.safeParse({ name: "Thandi", email: "a@b.co", message: "" }).success).toBe(false);
  });
  it("accepts name, email and message", () => {
    expect(contactSchema.safeParse({ name: "Thandi", email: "a@b.co", message: "Let's shoot" }).success).toBe(true);
  });
});

describe("WhatsApp button", () => {
  it("is hidden while no number is set", () => {
    expect(site.whatsappNumber).toBe("");
    expect(whatsappLink(site.whatsappNumber)).toBeNull();
  });
  it("builds a wa.me link from a South African number", () => {
    expect(whatsappLink("+27 82 123 4567")).toMatch(/^https:\/\/wa\.me\/27821234567\?text=/);
  });
});

describe("Instagram", () => {
  it("links to the real profile", () => {
    expect(site.instagramUrl).toBe("https://www.instagram.com/Shooter_is_the_best/");
  });
});

describe("portfolio filters", () => {
  it("shows every photo under All", () => {
    expect(filterPhotos(photos, "All")).toHaveLength(photos.length);
  });
  it("shows only Editorial photos under Editorial", () => {
    const editorial = filterPhotos(photos, "Editorial");
    expect(editorial.length).toBeGreaterThan(0);
    expect(editorial.every((p) => p.categories.includes("Editorial"))).toBe(true);
  });
});
