// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Project = defineDocumentType(() => ({
  name: "Project",
  filePathPattern: `projects/**/*.mdx`,
  // Type of file to parse (every mdx in all subfolders)
  contentType: "mdx",
  fields: {
    title: { type: "string", description: "The title of the project", required: true },
    date: { type: "string", description: "The date of the project", required: true },
    tags: { type: "string" },
    image: { type: "string" }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (Project2) => `/projects/${Project2._raw.flattenedPath}`
    }
  }
  // computedFields: {
  // 	id: {
  // 	  type: "string",
  // 	  resolve: (doc) => doc._raw.flattenedPath.replace("posts/", ""),
  // 	},
  // 	slug: {
  // 	  type: "string",
  // 	  resolve: (doc) => doc._raw.flattenedPath.replace("posts/", ""),
  // 	}
  // wordCount: {
  // 	type: 'number',
  // 	resolve: (project) => project.body.raw.split(/\s+/gu).length,
  //   },
}));
var Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`,
  // Type of file to parse (every mdx in all subfolders)
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
    }
  },
  //   computedFields: {
  //     url: {
  //       type: "string",
  //       resolve: (post) => `/posts/${post._raw.flattenedPath}`,
  //     },
  //   },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/posts/${post._raw.flattenedPath}`
    },
    id: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace("posts/", "")
    },
    slug: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath.replace("posts/", "")
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "data",
  // Source directory where the content is located
  documentTypes: [Post, Project]
});
export {
  Post,
  Project,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-XIFXYHOU.mjs.map
