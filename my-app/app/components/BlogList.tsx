import Link from 'next/link';
import { Post } from 'contentlayer/generated';
import { compareDesc, format, parseISO } from 'date-fns';

type BlogListProps = { posts: Post[] };

export default function BlogList({ posts }: BlogListProps) {
  const postsSorted = [...posts].sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));
  return (
    <ul className="divide-y">
      {postsSorted.map((post) => (
        <li key={post.url} className="py-4 first:pt-0">
          <Link className="flex flex-col gap-2 underline-offset-4 hover:underline sm:flex-row sm:justify-between sm:gap-6" href={post.url}>
            <span className="font-semibold">{post.title}</span>
            <time className="shrink-0 text-sm text-garden-muted" dateTime={post.date}>
              {format(parseISO(post.date), 'LLLL d, yyyy')}
            </time>
          </Link>
        </li>
      ))}
    </ul>
  );
}
