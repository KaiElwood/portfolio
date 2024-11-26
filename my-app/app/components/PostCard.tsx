import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { Project } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import Image from 'next/image';


const PostCard = (post: Project) => {
	const Content = useMDXComponent(post.body.code);
  
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
				{/* <div className="text-sm">
				<Content />
				</div> */}
				<div className="mt-auto pt-4 flex flex-wrap gap-1">
					{(post.tags ?? '').split(',').map((tag, idx) => (
						<span key={idx} className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-semibold text-gray-600 mr-1 mb-2">
							{tag}
						</span>
					))}
				</div>
			</div>
		</Link>
	);
  };

export default PostCard;
