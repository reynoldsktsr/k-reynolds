import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role / title", type: "string" }),
    defineField({
      name: "tagline",
      title: "Tagline",
      description: "One line shown in the hero.",
      type: "string",
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "blockContent",
    }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({
      name: "availability",
      title: "Availability note",
      type: "string",
    }),
    defineField({
      name: "social",
      title: "Social links",
      type: "array",
      of: [
        {
          type: "object",
          name: "socialLink",
          fields: [
            { name: "platform", type: "string", title: "Platform" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "role" },
  },
});
