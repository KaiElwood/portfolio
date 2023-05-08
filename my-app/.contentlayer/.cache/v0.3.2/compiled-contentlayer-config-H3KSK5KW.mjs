// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/*.mdx`,
  // Type of file to parse (every mdx in projects folder)
  contentType: "mdx",
  fields: {
    title: { type: "string", description: "The title of the project", required: true },
    date: { type: "date", description: "The date of the project", required: true },
    tags: { type: "string", required: true },
    image: { type: "string" }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (project) => `/${project._raw.flattenedPath}`
    },
    slug: {
      type: "string",
      resolve: (project) => project._raw.sourceFileName.replace(/\.mdx/, "")
    }
  }
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/*.mdx`,
  // Type of file to parse (every mdx in posts folder)
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true
    },
    intro: {
      type: "string",
      description: "The intro for the post",
      required: true
    },
    imgSrc: {
      type: "string",
      description: "Image source url",
      required: true
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`
    },
    slug: {
      type: "string",
      resolve: (post) => post._raw.sourceFileName.replace(/\.mdx/, "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  // Source directory where the content is located
  documentTypes: [Post, Project]
  // this is where the problem arises
});
export {
  Post,
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-H3KSK5KW.mjs.map
