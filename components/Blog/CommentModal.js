import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useStateContext } from "../../context/StateContext";
import { XIcon } from "@heroicons/react/outline";
import CommentForm from "./CommentForm";

const CommentModal = ({ _id }) => {
  const { commentModalOpen, setCommentModalOpen } = useStateContext();

  return (
    <Transition.Root show={commentModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-[9999]"
        onClose={setCommentModalOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-0 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 translate-y-0 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 translate-y-0 scale-95"
            >
              <Dialog.Panel className="relative my-8 w-full max-w-xl transform overflow-hidden rounded-lg bg-white p-6 px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-gray-800 md:max-w-2xl lg:max-w-4xl">
                <div className="absolute top-0 right-0 block pt-4 pr-4">
                  <button
                    type="button"
                    className="rounded-md bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={() => setCommentModalOpen(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="mb-4">
                  <div className="text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-primary dark:text-neutral text-lg font-medium uppercase leading-6"
                    >
                      Post Comment
                    </Dialog.Title>
                  </div>
                </div>
                <CommentForm _id={_id} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default CommentModal;
