import { big_sholders_text } from "@/lib/fonts";
import Reveal from "../animation/reveal";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const SectionBlock = ({
  title,
  description,
  imageSrc,
  url,
  imageAlt = "image",
  imagePriority = false,
}) => {
  return (
    <section className="space-y-4">
      <Link href={url}>
        <h1
          className={cn(
            `${big_sholders_text.className} text-[20px] md:text-[40px] md:-mb-[10px] cursor-pointer w-fit`
          )}
        >
          <Reveal>{title}</Reveal>
        </h1>
      </Link>

      <Reveal direction="up">
        <p className="text-sm text-slate-700 line-clamp-3">{description}</p>
      </Reveal>

      <Reveal>
        <Link href={url}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={1000}
            height={600}
            priority={imagePriority}
            className="w-full h-[250px] md:h-[400px] object-cover rounded-[8px] bg-[red]"
          />
        </Link>
      </Reveal>
    </section>
  );
};

export default SectionBlock;
