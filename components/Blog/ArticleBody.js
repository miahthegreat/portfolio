import BlockContent from "@sanity/block-content-to-react";

export default function ArticleBody({ content }) {
  return (
    <div className={`prose prose-slate mx-auto max-w-5xl dark:prose-invert`}>
      <BlockContent
        blocks={content}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
      />
    </div>
  );
}
