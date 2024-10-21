import BlogList from "app/components/BlogList";
import PortfolioList from "app/components/PortfolioList";
import { allPosts, allProjects } from "contentlayer/generated";

export default function Page() {
	return(
		<div className="flex-grow">
			<h2 className="text-3xl pb-2 border-b mb-5 font-bold">Portfolio</h2>
			<div className="px-5">
				<PortfolioList projects={allProjects}/>				
			</div>
		</div>
	);
}