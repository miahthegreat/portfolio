import cn from "classnames";
import { imageBuilder } from "../../lib/client";

export default function CoverImage({ title, imageObject, slug }) {
  const image = (
    <img
      width={1240}
      height={540}
      alt={`Cover Image for ${title}`}
      className={cn("rounded-lg", {
        "": slug,
      })}
      src={imageBuilder(imageObject).width(1240).height(540).url()}
    />
  );

  return <div className="-mx-5 sm:mx-0">{image}</div>;
}
