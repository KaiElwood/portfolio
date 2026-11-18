import type { Metadata } from 'next';
import RunningGarden from '../components/RunningGarden';

export const metadata: Metadata = {
  title: "Running garden · Kai's Garden",
  description: 'A year of running, in bloom.',
};

export default function Page() {
  return <div className="page-section"><RunningGarden /></div>;
}
