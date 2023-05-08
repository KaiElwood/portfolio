import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const Project = defineDocumentType(() => ({
	name: "Project",
	filePathPattern: `projects/*.mdx`, // Type of file to parse (every mdx in projects folder)
	contentType: 'mdx',
	fields: {
        title: { type: 'string', description: "The title of the project", required: true },
        date: { type: 'date', description: "The date of the project", required: true },
        tags: { type: 'string', required: true },
        image: { type: 'string' },
	},
	computedFields: {
	  url: {
		type: "string",
		resolve: (project) => `/${project._raw.flattenedPath}`,
	  },
	  slug: {
		type: "string",
		resolve: (project) => project._raw.sourceFileName.replace(/\.mdx/, ''),
	},
	},
  }));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `posts/*.mdx`, // Type of file to parse (every mdx in posts folder)
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
	intro: {
		type: "string",
		description: "The intro for the post",
		required: true,
	  },
	imgSrc: {
		type: "string",
		description: "Image source url",
		required: true,
	  },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => `/${post._raw.flattenedPath}`,
    },
	slug: {
		type: "string",
		resolve: (post) => post._raw.sourceFileName.replace(/\.mdx/, ''),
	},
  },
}));

// TODO: add an additional post type for projects, with a content directory path of /projects – 
// one will be for blogs, another for projects
export default makeSource({
  contentDirPath: "data", // Source directory where the content is located
  documentTypes: [Post, Project], // this is where the problem arises
});