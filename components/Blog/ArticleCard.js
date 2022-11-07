import Date from "./Date";
import CoverImage from "./CoverImage";
import Link from "next/link";
import { imageBuilder } from "../../lib/client";

export default function ArticleCard({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <Link as={`/blog/${slug}`} href="/blog/[slug]">
      <div className="hover:shadow-medium group overflow-hidden rounded-lg bg-gray-50 pb-2 text-center shadow transition-shadow duration-200 ease-in hover:cursor-pointer dark:bg-gray-800 md:p-2">
        <div className="mb-5">
          <CoverImage
            slug={slug}
            title={title}
            imageObject={coverImage}
            url={imageBuilder(coverImage).url()}
          />
        </div>
        <h3 className="text-primary dark:text-neutral py-2 text-2xl font-bold leading-tight md:py-0">
          <a className="group-hover:underline">{title}</a>
        </h3>
        <div className="text-primary/50 dark:text-neutral/50 mb-4 text-lg md:mb-0">
          posted <Date dateString={date} />
        </div>
        <p className="mb-4 text-lg leading-relaxed">{excerpt}</p>
      </div>
    </Link>
  );
}
