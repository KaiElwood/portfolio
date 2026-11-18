import Link from 'next/link';
import GardenMark from './GardenMark';

export default function NavBar() {
  return (
    <header className="flex min-h-20 shrink-0 items-center">
      <Link className="garden-brand" href="/"><GardenMark /><span>Kai's Garden</span></Link>
    </header>
  );
}
