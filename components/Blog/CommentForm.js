import { useState } from "react";
import { useForm } from "react-hook-form";

export default function CommentForm({ _id }) {
  const [formData, setFormData] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
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
        <h3>Thanks for your comment!</h3>
        <ul>
          <li>
            Name: {formData.name} <br />
            Email: {formData.email} <br />
            Comment: {formData.comment}
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
          className="form-input mt-1 block w-full rounded border bg-transparent py-2 px-3 shadow"
          placeholder="John Appleseed"
        />
      </label>
      <label className="mb-5 block">
        <span className="text-zinc-700  dark:text-zinc-400">Email</span>
        <input
          name="email"
          type="email"
          {...register("email", { required: true })}
          className="form-input mt-1 block w-full rounded border bg-transparent py-2 px-3 shadow"
          placeholder="your@email.com"
        />
      </label>
      <label className="mb-5 block">
        <span className="text-zinc-700  dark:text-zinc-400">Comment</span>
        <textarea
          {...register("comment", { required: true })}
          name="comment"
          className="form-textarea mt-1 block w-full rounded  border bg-transparent py-2 px-3 shadow"
          rows="8"
          placeholder="Enter some long form content."
        ></textarea>
      </label>
      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}
      <button
        type="submit"
        className="rounded bg-zinc-300/50 py-2 px-4 font-bold text-zinc-900/80 shadow transition-colors duration-200 ease-linear hover:bg-zinc-300 focus:shadow focus:outline-none dark:bg-zinc-700/50 dark:text-zinc-50 dark:hover:bg-zinc-700"
      >
        Submit
      </button>
    </form>
  );
}
