import Image from "next/image";
import Link from "next/link";
import { EventInterface } from "../../../../app/models/event";

type EventType = EventInterface & { _id: string; link: string };

export default function Event({ link, photo }: EventType) {
  return (
    <div>
      <Link href={link} className="aspect-square overflow-hidden rounded-2xl">
        <Image
          width={1920}
          height={1920}
          src={photo!}
          alt="Image d'évènement"
          className="image-cover cursor-pointer transition-all duration-700 hover:scale-[1.3]"
        />
      </Link>
    </div>
  );
}
