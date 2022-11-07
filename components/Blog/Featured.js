import Date from "./Date";
import CoverImage from "./CoverImage";
import Link from "next/link";

export default function Featured({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <h2 className="mb-8 font-mono text-6xl leading-tight tracking-wide text-zinc-900 dark:text-zinc-50 md:text-7xl">
        Featured Post
      </h2>
      <Link as={`/blog/${slug}`} href="/blog/[slug]">
        <div className="ring-primary/[0.025] hover:shadow-medium dark:ring-neutral/[0.025] group relative mb-8 grid grid-cols-1 overflow-hidden rounded-lg bg-gray-50 pb-2 text-center shadow ring-4 transition-shadow duration-200 ease-in hover:cursor-pointer dark:bg-gray-800 md:mb-16 md:grid-cols-2 md:p-2">
          <CoverImage
            slug={slug}
            imageObject={coverImage}
            title={title}
            url={coverImage}
          />
          <div className="my-auto flex min-h-full flex-col items-center justify-center">
            <h3 className="text-primary dark:text-neutral py-2 text-2xl font-bold leading-tight md:py-0 md:text-4xl lg:text-6xl">
              <Link as={`/blog/${slug}`} href="/blog/[slug]">
                <a className="group-hover:underline">{title}</a>
              </Link>
            </h3>
            <div className="mt-2">
              <div className="text-primary/50 dark:text-neutral/50 text-lg md:mb-0">
                posted <Date dateString={date} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
