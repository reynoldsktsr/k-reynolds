import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";

export const caseStudy = defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "summary",
      title: "Summary",
      description: "One or two sentences shown on cards and in search results.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().max(220),
    }),
    defineField({
      name: "coverImage",
      title: "Cover image",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role",
      type: "string",
      description: "Your role on the project, e.g. \"Lead Front-End Engineer\".",
    }),
    defineField({
      name: "client",
      title: "Client / context",
      type: "string",
      description: "Company, product, or \"Personal project\".",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    defineField({
      name: "tech",
      title: "Tools & technologies",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "metrics",
      title: "Metrics",
      description: "Short stat callouts, e.g. \"Load time\" / \"-40%\".",
      type: "array",
      of: [
        {
          type: "object",
          name: "metric",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "repoUrl",
      title: "Repository URL",
      type: "url",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
      initialValue: 0,
    }),
    defineField({
      name: "body",
      title: "Case study body",
      type: "blockContent",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "client",
      media: "coverImage",
    },
  },
});
