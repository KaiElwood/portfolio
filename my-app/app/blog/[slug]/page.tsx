import { format, parseISO } from 'date-fns';
import { Post, allPosts } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import { MetadataParams } from 'app/types/MetadataParams';

// this creates the static paths for the posts

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post.slug }));

export const generateMetadata = ({ params }: {params: MetadataParams}) => {
  const post: Post | undefined = allPosts.find((post) => post.slug === params.slug);
  return { title: post?.title };
};

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug);
  const Content = useMDXComponent(post?.body.code || '');

  if(!post) {
	// TODO: Return 401 error page not found on page load error
	return (<>error</>);
  }

  return (
    <article className="py-8 mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h1>{post.title}</h1>
      </div>
      <div className='prose prose-lg'>
        <Content />
      </div>
    </article>
  );
};

export default PostLayout;

