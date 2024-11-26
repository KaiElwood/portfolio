"use client";

import { Project, Post } from "contentlayer/generated";
import Link from "next/link";
import { useState } from "react";
import compareDesc from "date-fns/compareDesc";
import PostCard from "./PostCard";

type PortfolioListProps = {projects: Project[]};

// the parent component of this will be the projects page
// this component should be projectsSearchbox
// it will have a searchbar and a few automatic filter buttons
// it will have a child component of projects list, with different fields for each project

const PortfolioList = ({ projects }: PortfolioListProps) => {
	projects.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
	const [filteredProjects, setFilteredProjects] = useState(projects);
	const [filterTerm, setFilterTerm] = useState('');

  return (
		<div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12">
				{filteredProjects.map((post, idx) => (
					<PostCard key={idx} {...post}/>
				))}
			</div>
  );
};

export default PortfolioList;

