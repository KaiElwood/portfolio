import { Post } from "contentlayer/generated";
import { compareDesc } from 'date-fns'
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
				{postsSorted.map((project, idx) => (
					<div style={{ width: '100%', margin: '8px' }} key={idx}>
						<a href={project.url}>
							{project.title}
							<span style={{ paddingLeft: '12px' }}>{project.date}</span>
						</a>
					</div>
				))}
			</div>
		</>
	);
};

export default BlogList;

