// import { allPosts, Post } from "contentlayer/generated";
// import { 
// 	GetStaticPathsResult, 
// 	GetStaticPropsContext, 
// 	GetStaticPropsResult, 
// 	InferGetStaticPropsType, 
// 	NextPage 
// } from "next";
// import { useMDXComponent } from "next-contentlayer/hooks";
// // import PostLayout from '../../components/Blog'

// type PostProps = {
// 	posty: Post
//   }


// export default function Posty({ posty }: PostProps) {
// const Component = useMDXComponent(posty.body.code)

// return (
// 	// <PostLayout {...posty}>
// 		<Component />
// 	// </PostLayout>
// )
// }

// export async function getStaticPaths() {
// 	return {
// 	  paths: allPosts.map((post) => ({ params: { slug: post.slug } })),
// 	  fallback: false,
// 	}
//   }
  
//   export async function getStaticProps({ params }) {
// 	console.log(params);
// 	const post = allPosts.find((post) => post.slug === params.slug)
// 	return { props: { post } }
//   }

import { allPosts, type Post } from "contentlayer/generated"
import { GetStaticProps, InferGetStaticPropsType } from "next"
import { useMDXComponent } from "next-contentlayer/hooks"
 
export const getStaticPaths = () => {
	return {
	  paths: allPosts.map((post) => ({params: {slug: post.slug}})),
	  fallback: false,
	}
}
 
export const getStaticProps: GetStaticProps<{post: Post}> = ({ params }) => {
	const post = allPosts.find((post) => post.slug === params?.slug)

	if (!post) {
		return { notFound: true }
	}

	return { props: { post } }
}
 
export default function SinglePostPage({ post, }: InferGetStaticPropsType<typeof getStaticProps>) {
	const MDXContent = useMDXComponent(post.body.code)
	return (
		<>
			<div>{post.title}</div>
			<MDXContent />
		</>
	)
}

