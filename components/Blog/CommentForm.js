import classNames from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../context/StateContext";

export default function CommentForm({ _id }) {
  const [formData, setFormData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const { accent } = useStateContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    let response;
    setFormData(data);
    try {
      response = await fetch("/api/createComment", {
        method: "POST",
        body: JSON.stringify(data),
        type: "application/json",
      });
      setIsSubmitting(false);
      setHasSubmitted(true);
    } catch (err) {
      setFormData(err);
    }
  };

  if (isSubmitting) {
    return <h3>Submitting comment…</h3>;
  }
  if (hasSubmitted) {
    return (
      <>
        <h3 className="mb-4">Thanks for your comment!</h3>
        <ul className="items-centers flex flex-col gap-6">
          <li className="flex items-center gap-2">
            <span
              className={classNames(
                "max-w-max rounded-full px-2 py-1 text-sm leading-tight text-zinc-900 dark:text-zinc-50",
                accent ? accent.selectedColor : ""
              )}
            >
              Name
            </span>{" "}
            <span>{formData.name}</span>
          </li>
          <li className="flex items-center gap-2">
            <span
              className={classNames(
                "max-w-max rounded-full px-2 py-1 text-sm leading-tight text-zinc-900 dark:text-zinc-50",
                accent ? accent.selectedColor : ""
              )}
            >
              Email
            </span>
            <span>{formData.email}</span>
          </li>
          <li className="flex items-center gap-2">
            <span
              className={classNames(
                "max-w-max rounded-full px-2 py-1 text-sm leading-tight text-zinc-900 dark:text-zinc-50",
                accent ? accent.selectedColor : ""
              )}
            >
              Comment
            </span>
            <span>{formData.comment}</span>
          </li>
        </ul>
      </>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full" disabled>
      <input {...register("_id")} type="hidden" name="_id" value={_id} />
      <label className="mb-5 block">
        <span className="text-zinc-700  dark:text-zinc-400">Name</span>
        <input
          name="name"
          {...register("name", { required: true })}
          className={classNames(
            "form-input mt-1 block w-full rounded border bg-transparent py-2 px-3 shadow",
            accent ? accent.focusRingColor : ""
          )}
          placeholder="John Appleseed"
        />
      </label>
      <label className="mb-5 block">
        <span className="text-zinc-700  dark:text-zinc-400">Email</span>
        <input
          name="email"
          type="email"
          {...register("email", { required: true })}
          className={classNames(
            "form-input mt-1 block w-full rounded border bg-transparent py-2 px-3 shadow",
            accent ? accent.focusRingColor : ""
          )}
          placeholder="your@email.com"
        />
      </label>
      <label className="mb-5 block">
        <span className="text-zinc-700  dark:text-zinc-400">Comment</span>
        <textarea
          {...register("comment", { required: true })}
          name="comment"
          className={classNames(
            "form-textarea mt-1 block w-full rounded border bg-transparent py-2 px-3 shadow",
            accent ? accent.focusRingColor : ""
          )}
          rows="8"
          placeholder="Enter some long form content."
        ></textarea>
      </label>
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      <button
        type="submit"
        className={classNames(
          "rounded bg-zinc-300/50 py-2 px-4 font-bold text-zinc-900/80 shadow transition-colors duration-200 ease-linear hover:bg-zinc-300 focus:shadow focus:outline-none dark:bg-zinc-700/50 dark:text-zinc-50 dark:hover:bg-zinc-700",
          accent ? accent.hoverBgColor : ""
        )}
      >
        Submit
      </button>
    </form>
  );
}
