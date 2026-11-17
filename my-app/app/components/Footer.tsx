import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t py-6 text-sm">
      <Link className="hover:underline underline-offset-4" href="https://www.linkedin.com/in/kai-elwood-dieu/">
        LinkedIn
      </Link>
    </footer>
  );
}
