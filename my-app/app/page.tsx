import PostsList from "src/components/PostsList";
import ProjectsList from "src/components/ProjectsList";
import Header from '../src/components/Header';

const Home = () => {
	return (
		<div>
			<div>This is the Home page!</div>
			<PostsList numPosts={5}/>
			{/* <ProjectsList /> */}
	
		</div>
	  );
}

export default Home;

// import { allPosts, allProjects, type Post, type Project } from "contentlayer/generated";
// import type {
//   GetStaticPropsResult,
//   InferGetStaticPropsType,
//   NextPage,
// } from "next";

// export async function getStaticProps(): Promise<
//   GetStaticPropsResult<{ posts: Post[], projects: Project[] }>
// > {
//   return { props: { projects: allProjects, posts: allPosts } };
// }

// const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
//   posts, projects
// }) => {
//   return (
//     <div>
//       <Head>
//         <title>NextJs Content Layer Blog Template</title>
//       </Head>

// 	<div>This is the posts</div>
// 	<PostsList posts={posts} />
// 	<div>This is the projects</div>
// 	<ProjectsList projects={projects} />

//     </div>
//   );
// };
