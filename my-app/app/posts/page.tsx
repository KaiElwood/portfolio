import PostsList from "app/components/PostsList";

export default function Page() {
	return(
		<div className="flex-grow">
			<h2 className="text-3xl pb-2 border-b border-red mb-5">Blog</h2>
			<div className="px-5">
				<PostsList numPosts={15} />				
			</div>
		</div>
	)
}