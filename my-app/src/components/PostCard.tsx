import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { Post } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'


const PostCard = (post: Post) => {
	const Content = useMDXComponent(post.body.code)
  
	return (
	  <div className="mb-8">
		<h3 className="text-xl">
		  <Link href={post.url} className="text-blue-700 hover:text-blue-900" legacyBehavior>
			{post.title}
		  </Link>
		</h3>
		<time dateTime={post.date} className="block mb-2 text-xs text-gray-600">
		  {format(parseISO(post.date), 'LLLL d, yyyy')}
		</time>
		{/* <div className="text-sm">
		  <Content />
		</div> */}
	  </div>
	)
  }

export default PostCard
