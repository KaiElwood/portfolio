import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Project = defineDocumentType(() => ({
	name: "Project",
	filePathPattern: `projects/**/*.mdx`, // Type of file to parse (every mdx in all subfolders)
	contentType: 'mdx',
	fields: {
        title: { type: 'string', description: "The title of the project", required: true },
        date: { type: 'string', description: "The date of the project", required: true },
        tags: { type: 'string' },
        image: { type: 'string' },
	},
	computedFields: {
	  url: {
		type: "string",
		resolve: (Project) => `/projects/${Project._raw.flattenedPath}`,
	  },
	},
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

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `**/*.mdx`, // Type of file to parse (every mdx in all subfolders)
  contentType: 'mdx',
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
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
			resolve: (post) => `/posts/${post._raw.flattenedPath}`,
		},
		id: {
			type: "string",
			resolve: (post) => post._raw.flattenedPath.replace("posts/", ""),
		},
		slug: {
			type: "string",
			resolve: (post) => post._raw.flattenedPath.replace("posts/", ""),
		},
	},
}));

// TODO: add an additional post type for projects, with a content directory path of /projects – 
// one will be for blogs, another for projects
export default makeSource({
  contentDirPath: "data", // Source directory where the content is located
  documentTypes: [Post, Project],
});
