import { format, parseISO } from 'date-fns'
import { allPosts } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'

export const generateStaticParams = async () => allPosts.map((post) => ({ slug: post.slug }))

export const generateMetadata = ({ params }) => {
  const post = allPosts.find((post) => post.slug === params.slug)
  return { title: post.title }
}

const PostLayout = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find((post) => post.slug === params.slug)

  if(!post) {
	// TODO: Return 401 error page not found on page load error
	return (<>error</>)
  }

  const Content = useMDXComponent(post.body.code)

  return (
    <article className="py-8 mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <time dateTime={post.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(post.date), 'LLLL d, yyyy')}
        </time>
        <h1>{post.title}</h1>
      </div>
      <Content />
    </article>
  )
}

export default PostLayout

