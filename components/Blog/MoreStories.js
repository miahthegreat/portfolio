import ArticleCard from "./ArticleCard";

export default function MoreStories({ posts }) {
  return (
    <section>
      <h2 className="text-primary dark:text-neutral mb-8 text-6xl font-bold leading-tight tracking-tighter md:text-7xl">
        More Posts
      </h2>
      <div className="mb-32 grid grid-cols-1 gap-20 md:grid-cols-2 md:gap-16 lg:gap-32">
        {posts.map((post) => (
          <ArticleCard
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
    </section>
  );
}
