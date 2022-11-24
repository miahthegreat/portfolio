import Date from "./Date";
import CoverImage from "./CoverImage";
import Link from "next/link";
import { useStateContext } from "../../context/StateContext";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Featured({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}) {
  const { accent } = useStateContext();
  return (
    <section>
      <h2 className="mb-8 text-5xl leading-tight tracking-wide text-zinc-900 dark:text-zinc-50 md:text-7xl">
        <span>Featured Post</span>
      </h2>
      <Link as={`/blog/${slug}`} href="/blog/[slug]">
        <div>
          <div
            className={classNames(
              accent?.bgColor,
              "hover:shadow-medium group relative mb-8 grid grid-cols-1 overflow-hidden rounded-lg pb-2 text-center shadow ring-4 ring-zinc-500/[0.025] transition-shadow duration-200 ease-in hover:cursor-pointer dark:ring-zinc-200/[0.025] md:mb-16 md:grid-cols-2 md:p-2"
            )}
          >
            <CoverImage
              slug={slug}
              imageObject={coverImage}
              title={title}
              url={coverImage}
            />
            <div className="my-auto flex min-h-full flex-col items-center justify-center">
              <h3 className="py-2 text-2xl font-bold leading-tight text-zinc-900 dark:text-zinc-50 md:py-0 md:text-4xl">
                <Link as={`/blog/${slug}`} href="/blog/[slug]">
                  <a className="group-hover:underline">{title}</a>
                </Link>
              </h3>
              <div className="mt-2">
                <div className="text-xs uppercase text-zinc-900/70 dark:text-zinc-50/50 md:mb-0">
                  posted <Date dateString={date} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}
