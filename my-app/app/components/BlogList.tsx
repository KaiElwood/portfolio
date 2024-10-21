import { Post } from "contentlayer/generated";
import { compareDesc, format, parseISO } from 'date-fns'
import PostCard from "./PostCard";
import "./classes.css";

type BlogListProps = { posts: Post[] }

// *****TODO: limit number of postcards to numPost variable, 
// connect to PostCard 

const BlogList = ({ posts }: BlogListProps) => {
	const postsSorted = posts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
	return (
		<>
			<div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
				{postsSorted.map((post, idx) => (
					<div className="my-2" style={{ width: '100%' }} key={idx}>
						<a className="flex justify-between" href={post.url}>
							<span className="font-semibold">{post.title}</span>
							<time style={{ paddingLeft: '12px' }} dateTime={post.date}>
								{format(parseISO(post.date), 'LLLL d, yyyy')}
							</time>
						</a>
					</div>
				))}
			</div>
		</>
	);
};

export default BlogList;

