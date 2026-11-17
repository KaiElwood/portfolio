import { Project } from 'contentlayer/generated';
import compareDesc from 'date-fns/compareDesc';
import PostCard from './PostCard';

type PortfolioListProps = { projects: Project[] };

export default function PortfolioList({ projects }: PortfolioListProps) {
  const sortedProjects = [...projects].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  return (
    <div className="grid grid-cols-1 gap-8 pb-5 md:grid-cols-2">
      {sortedProjects.map((project) => <PostCard key={project.url} {...project} />)}
    </div>
  );
}
