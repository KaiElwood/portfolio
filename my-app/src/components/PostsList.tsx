import { allPosts } from "contentlayer/generated";
import { compareDesc } from 'date-fns'
import PostCard from "./PostCard";

type PostsListProps = { numPosts: Number }

// *****TODO: limit number of postcards to numPost variable, 
// connect to PostCard 

const PostsList = ({ numPosts = 5 }: PostsListProps) => {
	const posts = allPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
	return (
		<div>
			<h3>Blog:</h3>
			{posts.map((post, idx) => (
				<PostCard key={idx} {...post}/>
			))}
		</div>
	);
};

// type PostsListProps = {posts: Post[]}

// const PostsList = ({ posts }: PostsListProps) => {
//   return (
// 		<Flex flexWrap={"wrap"} align="center" justify="center">
// 			{posts.map((post, idx) => (
// 				<Box w={"100%"} m={2} key={idx}>
// 					<Link href={post.url}>
// 						{post.title}
// 						<Box as='span' pl={3} >{post.date}</Box>
// 					</Link>
// 				</Box>
// 			))}
// 		</Flex>
//   );
// };

export default PostsList;

