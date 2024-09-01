import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";

// Define the type for the post data
type PostData = {
  title: string;
  body: string;
};

// Function to perform the POST request
const post = async (newpost: PostData): Promise<PostData> => {
  const { title, body } = newpost;

  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, body, userId: 1 }),
  });

  if (!response.ok) {
    throw new Error("Failed to create new post");
  }

  return response.json();
};

const PostForm: React.FC = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State to track error messages

  // Correctly typing the mutation hook
  const { mutateAsync: addPostMutation, status } = useMutation({
    mutationFn: post,
  });

  const handleSubmit = async () => {
    console.log("submitting");
    try {
      setErrorMessage(null); // Clear previous error message
      await addPostMutation({ title, body });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setErrorMessage(error.message); // Set error message if error occurs
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Body:</label>
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        {/* Display error message if exists */}
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button
          type="button" // Change to button type 'button' to prevent form submission
          onClick={async () => {
            console.log("submitting");
            try {
              setErrorMessage(null); // Clear previous error message
              await addPostMutation({ title, body });
            } catch (error) {
              console.log(error);
              if (error instanceof Error) {
                setErrorMessage(error.message);
              } else {
                setErrorMessage("An unexpected error occurred.");
              }
            }
          }}
          disabled={status != "success"}
        >
          {status != "success" ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default PostForm;
