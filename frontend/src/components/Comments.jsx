import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

function Comments({ videoId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editingText, setEditingText] = useState("");
  const { user, token } = useSelector((state) => state.auth); // Access logged-in user and token

  // Fetch comments on component mount
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/comments/${videoId}`
        );
        setComments(response.data.videoComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [videoId]);

  // Handle adding a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;
    try {
      const response = await axios.post(
        `http://localhost:5000/comments`,
        { videoId, text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, response.data.newComment]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setComments(
        comments.filter((comment) => comment.commentId !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  // Handle editing a comment
  const handleEditComment = async (commentId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/comments/${commentId}`,
        { text: editingText },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(
        comments.map((comment) =>
          comment.commentId === commentId
            ? response.data.updatedComment
            : comment
        )
      );
      setEditingComment(null);
      setEditingText("");
    } catch (error) {
      console.error("Error editing comment:", error);
    }
  };

  return (
    <div className="w-full px-2 sm:px-6 md:px-8 py-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl mb-5 font-semibold text-gray-800">Comments</h3>
      {/* Comment Form */}
      {user && (
        <div className="mb-6">
          <textarea
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-1 bg-gray-100 w-full p-4 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent transition duration-200"
          />
          <button
            onClick={handleAddComment}
            className="text-sm bg-gray-200 text-black py-2 px-3 rounded-lg hover:bg-gray-700 hover:text-white transition duration-200"
          >
            Submit
          </button>
        </div>
      )}

      <ul className="list-none p-0">
        {[...comments].reverse().map((comment) => (
          <li key={comment._id} className="mb-6 border-b border-gray-300 pb-4">
            <div className="flex items-start space-x-3">
              {/* Comment's Name and Text */}
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-gray-800">
                    {comment.name}
                  </span>
                  <small className="text-xs text-gray-500">
                    {new Date(comment.timestamp).toLocaleString()}
                  </small>
                </div>
                <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
              </div>
            </div>

            {user && user.username === comment.name && (
              <div className="mt-3 flex space-x-4">
                {editingComment === comment.commentId ? (
                  <>
                    <input
                      type="text"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      className="w-full p-2 text-sm rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={() => handleEditComment(comment.commentId)}
                      className="text-sm bg-gray-200 text-black py-1 px-2 rounded-lg hover:bg-gray-700 hover:text-white transition duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setEditingComment(null);
                        setEditingText("");
                      }}
                      className="text-lg text-gray-500 hover:text-gray-700 transition duration-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingComment(comment.commentId);
                        setEditingText(comment.text);
                      }}
                      className="text-lg text-green-700 hover:text-green-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment.commentId)}
                      className="text-lg text-red-500 hover:text-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
