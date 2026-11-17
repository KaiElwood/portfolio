import PortfolioList from 'app/components/PortfolioList';
import { allProjects } from 'contentlayer/generated';

export default function Page() {
  return (
    <div className="page-section">
      <h1 className="page-title">Portfolio</h1>
      <PortfolioList projects={allProjects} />
    </div>
  );
}
