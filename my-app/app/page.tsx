import FlowerSketch from "./components/FlowerSketch";

// TODO: (cody)
// Use React's Context API to create a global state for the garden's position.
// Wrap your app with this context provider.
// In your FlowerSketch component, read from and update this global state.
// Only initialize the garden position if it hasn't been set yet.

// Basically, instead of writing the garden from scratch
// I can save the results of the garden as well as their progress toward fully bloomed
// Then I can use the context API to keep track of the garden's state
// Then I can relay that info back to p5

const Home = () => {
	return (
			<div className="flex-grow relative">
				<div className="text-container-main mt-[30vh]">
					<h2 className="text-3xl mb-2 leading-10 font-harbour">Hi, I'm Kai</h2>
					<p className="text-lg leading-8 max-w-prose">Welcome to my garden! Here, you can scroll through my passion projects and explorations in data viz or read my thoughts on saving our planet.</p>
				</div>
				<div className="z-neg absolute bottom-0">
					<FlowerSketch />
				</div>
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
