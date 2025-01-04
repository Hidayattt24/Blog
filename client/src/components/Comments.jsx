import axios from "axios";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useAuth, useUser } from "@clerk/clerk-react";
import { toast } from "react-toastify";
import { useState } from "react";

// Fetch comments from the API
const fetchComments = async (postId) => {
  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/comments/${postId}`
  );
  return res.data;
};

const Comments = ({ postId }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [sendingComment, setSendingComment] = useState(null); // State for "Sending..." comment
  const [textareaValue, setTextareaValue] = useState(""); // State for textarea input

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newComment) => {
      const token = await getToken();
      return axios.post(
        `${import.meta.env.VITE_API_URL}/comments/${postId}`,
        newComment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },
    onSuccess: () => {
      setSendingComment(null); // Clear the "Sending..." comment
      setTextareaValue(""); // Clear the textarea input
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
    onError: (error) => {
      setSendingComment(null); // Clear the "Sending..." comment
      toast.error(error.response.data || "Failed to send comment.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!textareaValue.trim()) {
      toast.warn("Comment cannot be empty!");
      return;
    }

    const data = {
      desc: textareaValue,
    };

    setSendingComment({
      desc: data.desc,
      createdAt: new Date(),
      user: {
        img: user.imageUrl,
        username: user.username,
      },
    });

    mutation.mutate(data);
  };

  return (
    <div className="flex flex-col gap-8 lg:w-3/5 mb-12">
      <h1 className="text-xl text-blue-500 underline font-bold">Comment</h1>
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-between gap-8 w-full"
      >
        <textarea
          name="desc"
          value={textareaValue}
          onChange={(e) => setTextareaValue(e.target.value)} // Update state on input
          placeholder="Write a comment"
          className="w-full p-4 rounded-xl"
          required
        />
        <button
          type="submit"
          className="bg-blue-800 px-4 py-3 text-white font-medium rounded-xl"
        >
          Send
        </button>
      </form>
      {isPending ? (
        "Loading..."
      ) : error ? (
        <p>Error comment: {error.message}</p>
      ) : data?.length === 0 ? (
        <p>Nothing in here...</p>
      ) : (
        <>
          {/* Show "Sending..." comment */}
          {sendingComment && (
            <Comment
              comment={{
                ...sendingComment,
                desc: `${sendingComment.desc} (Sending...)`,
              }}
            />
          )}
          {/* Display all fetched comments */}
          {data?.map?.((comment) => (
            <Comment key={comment._id} comment={comment} postId={postId} />
          ))}
        </>
      )}
    </div>
  );
};

export default Comments;
