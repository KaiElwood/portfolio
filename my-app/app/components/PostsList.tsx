import { Post } from "contentlayer/generated";
import { compareDesc } from 'date-fns'
import PostCard from "./PostCard";
import "./classes.css";

type PostsListProps = { posts: Post[] }

// *****TODO: limit number of postcards to numPost variable, 
// connect to PostCard 

const PostsList = ({ posts }: PostsListProps) => {
	const postsSorted = posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
				{postsSorted.map((post, idx) => (
					<PostCard key={idx} {...post}/>
				))}
			</div>
		</>
	);
};

export default PostsList;

