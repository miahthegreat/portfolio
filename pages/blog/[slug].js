import { useRouter } from "next/router";
import ErrorPage from "next/error";
import MoreStories from "../../components/Blog/MoreStories";
import ArticleComments from "../../components/Blog/ArticleComments";
import Layout from "../../components/Layouts/Layout";
import { getAllPostsWithSlug, getPostAndMorePosts } from "../../lib/api";
import ArticleTitle from "../../components/Blog/ArticleTitle";
import ArticleBody from "../../components/Blog/ArticleBody";
import ArticleHeader from "../../components/Blog/ArticleHeader";
import Head from "next/head";
import { CMS_NAME } from "../../lib/constants";
import CommentModal from "../../components/Blog/CommentModal";

export default function Post({ post, morePosts, preview }) {
  const router = useRouter();
  console.log(post, morePosts, preview);
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <Layout preview={preview}>
      <div className="px-4">
        {router.isFallback ? (
          <ArticleTitle>Loading…</ArticleTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {post.title} | {CMS_NAME}
                </title>
              </Head>
              <ArticleHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <ArticleBody content={post.body} />
            </article>

            <ArticleComments comments={post.comments} />
            <CommentModal _id={post._id} />
            {morePosts.length > 0 && <MoreStories posts={morePosts} />}
          </>
        )}
      </div>
    </Layout>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview);
  return {
    props: {
      preview,
      post: data?.post || null,
      morePosts: data?.morePosts || null,
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const allPosts = await getAllPostsWithSlug();
  return {
    paths:
      allPosts?.map((post) => ({
        params: {
          slug: post.slug,
        },
      })) || [],
    fallback: true,
  };
}
