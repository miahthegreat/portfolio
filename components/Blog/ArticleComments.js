import Date from "./Date";
import { MdAddComment } from "react-icons/md";
import { useStateContext } from "../../context/StateContext";

export default function ArticleComments({ comments = [] }) {
  const { setCommentModalOpen } = useStateContext();
  return (
    <>
      <div className="mt-10 mb-4 flex items-center gap-4 leading-tight tracking-wider">
        <h2 className="text-4xl lg:text-6xl">Comments</h2>
        <h4 className="text-base">
          <button
            type="button"
            className="flex items-center gap-3 border-b border-gray-200 px-4 py-2 uppercase text-gray-400 transition-colors duration-200 ease-in hover:border-gray-400 hover:text-gray-900 dark:hover:text-gray-50"
            onClick={() => setCommentModalOpen(true)}
          >
            <span>
              <MdAddComment />
            </span>
            <span>Add Comment</span>
          </button>
        </h4>
      </div>
      <ul className="border-b">
        {comments?.map(({ _id, _createdAt, name, email, comment }) => (
          <li key={_id} className="mb-5 rounded-lg border-2 p-8">
            <div className="flex items-center">
              <h4 className="text-primary dark:text-neutral mb-2 max-w-max rounded-full bg-gray-100 px-4 py-2 leading-tight dark:bg-gray-700">
                <a href={`mailto:${email}`}>{name}</a>
              </h4>
              <div className="mb-2 max-w-max px-4 py-2 text-xs uppercase leading-tight tracking-wider text-gray-400/90">
                <spam>Posted </spam>
                <Date dateString={_createdAt} />
              </div>
            </div>
            <p className="ml-2">{comment}</p>
          </li>
        ))}
        {comments.length < 1 && (
          <li className="p-8">
            <h4 className="text-xl font-bold">
              No Comments posted and/or approved.
            </h4>
            <p>Click the button above to add one.</p>
          </li>
        )}
      </ul>
    </>
  );
}
