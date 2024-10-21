import Link from 'next/link'
import { format, parseISO } from 'date-fns'
import { Project } from 'contentlayer/generated'
import { useMDXComponent } from 'next-contentlayer/hooks'
import Image from 'next/image'


const PostCard = (post: Project) => {
	const Content = useMDXComponent(post.body.code)
  
	return (
		<Link href={post.url} legacyBehavior>
			<div className="box relative cursor-pointer p-5 mb-8 bg-yellow-400">
				<div className='w-full h-52 relative'>
					<Image 
						fill
						src={post.imgSrc}
						alt={post.title}
						style={{objectFit: "cover"}}
					/>
				</div>
				<h3 className="text-xl mt-2 font-bold text-black-700 hover:text-slate-700">
				<Link href={post.url} legacyBehavior>
					{post.title}
				</Link>
				</h3>
				<time dateTime={post.date} className="block mb-4 text-xs text-gray-600">
				{format(parseISO(post.date), 'LLLL d, yyyy')}
				</time>
				<p className='text-sm'>
					{post.title}
				</p>
				{/* <div className="text-sm">
				<Content />
				</div> */}
			</div>
		</Link>
	)
  }

export default PostCard
