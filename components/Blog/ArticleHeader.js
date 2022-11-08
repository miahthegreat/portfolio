import ArticleAvatar from "./ArticleAvatar";
import Date from "./Date";
import CoverImage from "./CoverImage";
import ArticleTitle from "./ArticleTitle";

export default function ArticleHeader({ title, coverImage, date, author }) {
  return (
    <>
      <ArticleTitle>{title}</ArticleTitle>
      <div className="hidden md:mb-12 md:block">
        <ArticleAvatar name={author?.name} picture={author?.picture} />
      </div>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} imageObject={coverImage} url={coverImage} />
      </div>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 block md:hidden">
          <ArticleAvatar name={author?.name} picture={author?.picture} />
        </div>
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  );
}
