import { allPosts, Post } from "contentlayer/generated";
import type {
  GetStaticPropsResult,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import PostsList from "src/components/PostsList";
import Head from "next/head";
import Link from "next/link";
import { Box } from "@chakra-ui/react";

export async function getStaticProps(): Promise<
  GetStaticPropsResult<{ posts: Post[] }>
> {
  return { props: { posts: allPosts } };
}

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({
  posts,
}) => {
  return (
    <div>
      <Head>
        <title>NextJs Content Layer Blog Template</title>
      </Head>

	  <PostsList posts={posts} />

    </div>
  );
};

export default Home;
