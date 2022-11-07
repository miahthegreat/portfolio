import Featured from "../components/Blog/Featured";
import MoreStories from "../components/Blog/MoreStories";
import { getAllPostsForHome } from "../lib/api";

const Blog = ({ allPosts }) => {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);
  return (
    <div className="main__blog">
      {/* <div className="mb-8">
        <h1 className="heading">Featured Articles</h1>
        <h3 className="heading__sub1">From the mind of Jeremiah</h3>
        <p className="heading__sub2">Please read at your leisure</p>
      </div> */}
      {heroPost && (
        <Featured
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
    </div>
  );
};

export default Blog;

export async function getStaticProps({ preview = false }) {
  const allPosts = await getAllPostsForHome(preview);
  return {
    props: { allPosts, preview },
    revalidate: 1,
  };
}
