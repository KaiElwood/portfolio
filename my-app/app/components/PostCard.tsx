import Link from 'next/link';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { Project } from 'contentlayer/generated';
import styles from './PostCard.module.css';

export default function PostCard(project: Project) {
  const tags = (project.tags ?? '').split(',').map((tag) => tag.trim()).filter(Boolean);
  return (
    <Link href={project.url} className={`${styles.card} flex min-w-0 flex-col bg-garden-surface p-5`}>
      <div className="relative h-52">
        <Image fill src={project.imgSrc} alt={project.title} className="object-cover"
          sizes="(min-width: 1440px) 624px, (min-width: 768px) calc((100vw - 192px) / 2), calc(100vw - 88px)" />
      </div>
      <h2 className="mt-4 text-xl/7 font-medium text-garden-lilac">{project.title}</h2>
      <time dateTime={project.date} className="mt-2 text-xs text-garden-muted">
        {format(parseISO(project.date), 'LLLL d, yyyy')}
      </time>
      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-garden-background px-2 py-1 text-xs font-semibold text-garden-muted">{tag}</span>
        ))}
      </div>
    </Link>
  );
}
