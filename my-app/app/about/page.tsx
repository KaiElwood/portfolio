import Image from "next/image";
import "../components/classes.css";


export default function Page() {
	return(
		<div className="flex-grow">
			<h2 className="text-3xl font-bold pb-2 border-b mb-5">
				About Me
			</h2>
			<div className="flex gap-4 flex-wrap p-4 m-10 box relative bg-[rgba(255, 100, 101, 1)]">
				<div className='w-96 h-96 relative grow basis-full lg:basis-1/2'>
					<Image 
						fill
						src={"/../public/imgs/kai_side.JPG"}
						alt={"Kai Elwood-Dieu"}
						style={{objectFit: "cover"}}
					/>
				</div>
					<p className="flex-initial lg:basis-3/4 max-w-prose">
						I'm Kai! Thanks for coming to my page. I'm from Bethesda, Maryland and I've lived in a few places around the world, but I currently call New York City home. I am passionate about the environment and the outdoors, and one of my goals in life is to contribute meaningfully to preserving them for future generations. I love travelling. You can find me at the local rock climbing gym. I don't like writing bios in third person.
					</p>
			</div>
		</div>

	)
}
