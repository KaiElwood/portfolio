"use client";

import { Project, Post } from "contentlayer/generated";
import Link from "next/link";
import { Flex, Box, Text, Image } from "@chakra-ui/react";
import { useState } from "react";
import compareDesc from "date-fns/compareDesc";
import PostCard from "./PostCard";

type PortfolioListProps = {projects: (Project | Post)[]};

// the parent component of this will be the projects page
// this component should be projectsSearchbox
// it will have a searchbar and a few automatic filter buttons
// it will have a child component of projects list, with different fields for each project

const PortfolioList = ({ projects }: PortfolioListProps) => {
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
