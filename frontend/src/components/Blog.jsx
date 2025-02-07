import React, { useState } from "react";

const Blog = () => {
  const [posts, setPosts] = useState([
    {
      title: "Introduction to React",
      date: "February 7, 2025",
      content: "React is a JavaScript library for building user interfaces..."
    },
    {
      title: "Understanding JavaScript Closures",
      date: "February 5, 2025",
      content: "A closure is the combination of a function and the lexical environment within which that function was declared..."
    },
    // Add more initial posts as needed
  ]);

  const [newPost, setNewPost] = useState({ title: "", date: "", content: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleAddPost = () => {
    setPosts([...posts, newPost]);
    setNewPost({ title: "", date: "", content: "" });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-blue-500">
      <h2 className="text-4xl font-bold text-white mb-8">Blog</h2>
      {posts.map((post, index) => (
        <div key={index} className="mb-8">
          <h3 className="text-2xl font-semibold text-white">{post.title}</h3>
          <p className="text-gray-200">{post.date}</p>
          <p className="text-gray-100 mt-4">{post.content}</p>
        </div>
      ))}
      <div className="mt-10">
        <h3 className="text-2xl font-semibold text-white mb-4">Add New Post</h3>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="p-2 border rounded mb-4 w-full"
        />
        <input
          type="text"
          name="date"
          value={newPost.date}
          onChange={handleInputChange}
          placeholder="Date"
          className="p-2 border rounded mb-4 w-full"
        />
        <textarea
          name="content"
          value={newPost.content}
          onChange={handleInputChange}
          placeholder="Content"
          className="p-2 border rounded mb-4 w-full"
        />
        <button
          onClick={handleAddPost}
          className="bg-white text-blue-500 px-4 py-2 rounded"
        >
          Add Post
        </button>
      </div>
    </div>
  );
};

export default Blog;