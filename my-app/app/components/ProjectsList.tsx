"use client";

import { Project } from "contentlayer/generated";
import Link from "next/link";
import { Flex, Box, Text, Image } from "@chakra-ui/react";
import { useState } from "react";

type ProjectsListProps = {projects: Project[]}

// the parent component of this will be the projects page
// this component should be projectsSearchbox
// it will have a searchbar and a few automatic filter buttons
// it will have a child component of projects list, with different fields for each project

const ProjectsList = ({ projects }: ProjectsListProps) => {
	const [filteredProjects, setFilteredProjects] = useState(projects);
	const [filterTerm, setFilterTerm] = useState('');

  return (
		<Flex flexWrap={"wrap"} align="center" justify="center">
			{filteredProjects.map((project, idx) => (
				<Box w={"100%"} m={2} key={idx}>
					<Link href={project.url}>
						{project.title}
						<Box as='span' pl={3} >{project.date}</Box>
					</Link>
				</Box>
			))}
		</Flex>
  );
};

export default ProjectsList;

