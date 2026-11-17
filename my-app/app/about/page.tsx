import Image from 'next/image';

export default function Page() {
  return (
    <div className="page-section">
      <h1 className="page-title">About Me</h1>
      <div className="grid items-start gap-8 md:grid-cols-2">
        <div className="relative aspect-[4/3]">
          <Image
            fill
            src="/imgs/kai_side.JPG"
            alt="Kai Elwood-Dieu"
            sizes="(min-width: 1024px) 464px, (min-width: 768px) calc((100vw - 96px) / 2), calc(100vw - 40px)"
            className="object-cover"
          />
        </div>
        <p className="max-w-prose">
          I'm Kai! Thanks for coming to my page. I'm from Bethesda, Maryland and I've lived in a few places around the world, but I currently call New York City home. I am passionate about the environment and the outdoors, and one of my goals in life is to contribute meaningfully to preserving them for future generations. I love travelling. You can find me at the local rock climbing gym. I don't like writing bios in third person.
        </p>
      </div>
    </div>
  );
}
