import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

type PostData = {
  title: string;
  body: string;
};

const post = async (newpost: PostData): Promise<PostData> => {
  const { title, body } = newpost;
  console.log("trying");
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, userId: 1 }),
  });
  console.log("response", response);
  if (!response.ok) {
    throw new Error("Failed to create new post");
  }

  return response.json();
};

const PostForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to track error messages

  const {
    mutateAsync: addPostMutation,
    status,
    isError,
    error,
  } = useMutation({
    onError: (error) => {
      setErrorMessage(error.message); // Set error message on error
    },
    mutationFn: post,
  });

  useEffect(() => {
    if (status === "success") {
      setTitle("");
      setBody("");
    }
  }, [status]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("submitting");
    // console.log("iserror", isError);

    if (isError) {
      console.log(error);
      setErrorMessage(error.message);
    }
    try {
      setErrorMessage(null);
      await addPostMutation({ title, body });
    } catch (error: any) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} id="post">
        <div className="flex flex-col space-y-2 mb-4">
          <label className="font-semibold" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-slate-500"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label className="font-semibold" htmlFor="body">
            Body
          </label>
          <input
            id="body"
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            className="border border-slate-500"
          />
        </div>

        {errorMessage && (
          <p className="text-red-600 mt-2">Error: {errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "pending"}
          className="font-semibold bg-blue-300 border border-slate-500 p-2 mt-4"
        >
          {status === "pending" ? "Submitting..." : "Submit"}
        </button>

        {status == "success" ? (
          <p className="text-green-700"> Post submitted successfully!!</p>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default PostForm;
