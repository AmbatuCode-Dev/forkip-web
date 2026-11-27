import { z } from "zod";

export const siteContentSchema = z.strictObject({
  name: z.string(),
  description: z.string(),
});

export const navigationRouteSchema = z.strictObject({
  label: z.string(),
  shortLabel: z.string().optional(),
  footerLabel: z.string().optional(),
});

const headerLinkSchema = z.strictObject({
  kind: z.literal("link"),
  href: z.string(),
  label: z.string(),
});

const headerDropdownItemSchema = z.strictObject({
  href: z.string(),
  chip: z.string(),
  label: z.string(),
  description: z.string(),
});

const headerDropdownSchema = z.strictObject({
  kind: z.literal("dropdown"),
  id: z.enum(["layanan", "organisasi"]),
  label: z.string(),
  heading: z.string(),
  items: z.array(headerDropdownItemSchema).readonly(),
});

export const headerNavEntrySchema = z.discriminatedUnion("kind", [
  headerLinkSchema,
  headerDropdownSchema,
]);

export const navigationContentSchema = z.strictObject({
  ctaLabel: z.string(),
  ctaHref: z.string(),
  routes: z.record(z.string(), navigationRouteSchema).readonly(),
  header: z.array(headerNavEntrySchema).readonly(),
  footer: z.strictObject({
    menu: z.array(z.string()).readonly(),
    lainnya: z.array(z.string()).readonly(),
  }),
});

export const facultyRecordSchema = z.strictObject({
  code: z.string(),
  name: z.string(),
  color: z.string(),
  order: z.number().int(),
  outline: z.boolean().optional(),
  whatsappHref: z.string().optional(),
});

export const programSpotlightContentSchema = z.strictObject({
  title: z.string(),
  paragraphs: z.array(z.string()).readonly(),
  bullets: z
    .array(
      z.strictObject({
        label: z.string(),
        text: z.string(),
      }),
    )
    .readonly(),
  closing: z.string(),
  cta: z.string(),
  photoLabel: z.string(),
  ctaHref: z.string().optional(),
});

export const programCardContentSchema = z.strictObject({
  order: z.number().int(),
  title: z.string(),
  excerpt: z.string(),
  cta: z.string(),
  photoLabel: z.string(),
  ctaHref: z.string().optional(),
});

export const newsPostContentSchema = z.strictObject({
  order: z.number().int(),
  slug: z.string(),
  title: z.string(),
  uploadedLabel: z.string().optional(),
  photoCount: z.number().int(),
  page: z.number().int(),
  gallery: z
    .strictObject({
      badge: z.string().optional(),
      caption: z.string(),
    })
    .optional(),
  paragraphs: z.array(z.string()).readonly(),
});

export const homeBeritaContentSchema = z.strictObject({
  title: z.string(),
  subtitle: z.string(),
  featureSlug: z.string(),
  teaserSlugs: z.array(z.string()).readonly(),
  ctaLabel: z.string(),
  ctaButton: z.string(),
  ctaHref: z.string(),
});
