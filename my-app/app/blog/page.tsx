import BlogList from 'app/components/BlogList';
import { allPosts } from 'contentlayer/generated';

export default function Page() {
  return (
    <div className="page-section">
      <h1 className="page-title">Blog</h1>
      <BlogList posts={allPosts} />
    </div>
  );
}
