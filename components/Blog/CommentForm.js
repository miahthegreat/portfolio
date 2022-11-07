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
        <span className="text-gray-700  dark:text-gray-400">Name</span>
        <input
          name="name"
          {...register("name", { required: true })}
          className="form-input mt-1 block w-full rounded border bg-transparent py-2 px-3 shadow"
          placeholder="John Appleseed"
        />
      </label>
      <label className="mb-5 block">
        <span className="text-gray-700  dark:text-gray-400">Email</span>
        <input
          name="email"
          type="email"
          {...register("email", { required: true })}
          className="form-input mt-1 block w-full rounded border bg-transparent py-2 px-3 shadow"
          placeholder="your@email.com"
        />
      </label>
      <label className="mb-5 block">
        <span className="text-gray-700  dark:text-gray-400">Comment</span>
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
        className="focus:shadow-outline bg-primary/90 text-neutral/90 hover:bg-primary dark:bg-neutral/90 dark:text-primary dark:hover:bg-neutral rounded py-2 px-4 font-bold shadow transition-colors duration-200 ease-linear focus:outline-none"
      >
        Submit
      </button>
    </form>
  );
}
