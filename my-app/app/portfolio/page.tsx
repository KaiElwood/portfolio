import ProjectsList from "app/components/ProjectsList";
import { allProjects } from "contentlayer/generated";

export default function Page() {
	return(
		<div className="flex-grow">
			<h2 className="text-3xl pb-2 border-b mb-5 font-bold">Portfolio</h2>
			<div className="px-5">
				<ProjectsList projects={allProjects}/>				
			</div>
		</div>
	)
}