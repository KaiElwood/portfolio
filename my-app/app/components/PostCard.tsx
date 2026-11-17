import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { Project } from 'contentlayer/generated';
import styles from './PostCard.module.css';

export default function PostCard(project: Project) {
  const tags = (project.tags ?? '').split(',').map((tag) => tag.trim()).filter(Boolean);
  return (
    <Link href={project.url} className={`${styles.card} flex min-w-0 flex-col bg-yellow-400 p-5`}>
      <div className="relative h-52">
        <Image fill src={project.imgSrc} alt={project.title} className="object-cover"
          sizes="(min-width: 1024px) 424px, (min-width: 768px) calc((100vw - 176px) / 2), calc(100vw - 80px)" />
      </div>
      <h2 className="mt-4 text-xl/7 font-bold">{project.title}</h2>
      <time dateTime={project.date} className="mt-2 text-xs text-gray-700">
        {format(parseISO(project.date), 'LLLL d, yyyy')}
      </time>
      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold text-gray-700">{tag}</span>
        ))}
      </div>
    </Link>
  );
}
