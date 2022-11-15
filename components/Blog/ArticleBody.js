import { PortableText } from "@portabletext/react";
import Parallax from "../Parallax";

export default function ArticleBody({ content }) {
  return (
    <div className={`prose prose-slate mx-auto max-w-5xl dark:prose-invert`}>
      <PortableText value={content} />
    </div>
  );
}
