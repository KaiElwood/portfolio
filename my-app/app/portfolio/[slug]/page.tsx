import { format, parseISO } from 'date-fns';
import { Project, allProjects } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer2/hooks';
import { MetadataParams } from 'app/types/MetadataParams';

export const generateStaticParams = async () => allProjects.map((project) => ({ slug: project.slug }));

export const generateMetadata = ({ params }: {params: MetadataParams}) => {
  const project: Project | undefined = allProjects.find((project) => project.slug === params.slug);
  return { title: project?.title };
};

const ProjectLayout = ({ params }: { params: { slug: string } }) => {
  const project = allProjects.find((project) => project.slug === params.slug);
  const Content = useMDXComponent(project?.body.code || '');

  if(!project) {
	// TODO: Return 401 error page not found on page load error
	return (<>error</>);
  }

  return (
    <article className="page-section mx-auto w-full max-w-prose">
      <div className="mb-8">
        <time dateTime={project.date} className="mb-2 block text-sm text-garden-muted">
          {format(parseISO(project.date), 'LLLL d, yyyy')}
        </time>
        <h1 className="page-title">{project.title}</h1>
      </div>
      <div className="prose max-w-none">
        <Content />
      </div>
    </article>
  );
};

export default ProjectLayout;

