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
    <article className="py-8 mx-auto max-w-xl">
      <div className="mb-8 text-center">
        <time dateTime={project.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(project.date), 'LLLL d, yyyy')}
        </time>
        <h1>{project.title}</h1>
      </div>
      <div className='prose prose-md'>
        <Content />
      </div>
    </article>
  );
};

export default ProjectLayout;

