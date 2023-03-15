import { Post } from "contentlayer/generated";
import Link from "next/link";
import { Flex, Box } from "@chakra-ui/react";

type PostsListProps = {posts: Post[]}

const PostsList = ({ posts }: PostsListProps) => {
  return (
		<Flex flexWrap={"wrap"} align="center" justify="center">
			{posts.map((post, idx) => (
				<Box w={"100%"} m={2} key={idx}>
					<Link href={post.url}>
						{post.title}
						<Box as='span' pl={3} >{post.date}</Box>
					</Link>
				</Box>
			))}
		</Flex>
  );
};

export default PostsList;

