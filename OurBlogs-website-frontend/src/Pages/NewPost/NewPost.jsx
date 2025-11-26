import React, { useState, useEffect } from "react";
import "./NewPost.css";

function NewPost() {
  const [postData, setPostData] = useState({
    userID: null,
    category: "General",
    title: "",
    content: "",
  });

  // ✅ Fetch stored user ID after login
  useEffect(() => {
    const storedID = sessionStorage.getItem("UserID");
    console.log("Fetched UserID from sessionStorage:", storedID); // debug
    if (storedID) {
      setPostData((prev) => ({
        ...prev,
        userID: parseInt(storedID),
      }));
    }
  }, []);

  function handleInput(e) {
    const { name, value } = e.target;
    setPostData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!postData.userID) {
      alert("❌ You must be logged in to post a blog!");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/blog/newBlog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      const data = await res.json();
      console.log("Server Response:", data);
      alert("✅ Blog posted successfully!");
      // Optionally reset form:
      setPostData({
        ...postData,
        title: "",
        content: "",
      });
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Something went wrong while posting the blog!");
    }
  }

  return (
    <div className="newpost-page">
      <div className="card p-4 shadow w-100 mx-auto" style={{ maxWidth: "600px" }}>
        <h4 className="mb-4 text-center">
          Create a Post {sessionStorage.getItem("UserName") && `(Welcome, ${sessionStorage.getItem("UserName")})`}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Category</label>
            <select
              className="form-select w-100"
              name="category"
              value={postData.category}
              onChange={handleInput}
            >
              <option>General</option>
              <option>Fitness</option>
              <option>Programming</option>
              <option>Travel</option>
              
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter title"
              value={postData.title}
              onChange={handleInput}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              name="content"
              className="form-control"
              rows="5"
              placeholder="Write your thoughts..."
              value={postData.content}
              onChange={handleInput}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPost;
