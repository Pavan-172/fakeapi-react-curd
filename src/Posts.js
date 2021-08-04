import React, { useReducer, useState } from "react";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "get": {
      return [...action.data];
    }
    case "create": {
      const posts = [...state];
      posts.push(action.data);
      return [...posts];
    }
    case "update": {
      console.log(action.data);
      return state;
    }
    case "delete": {
      console.log(action.data);
      return state;
    }
    default: {
      return state;
    }
  }
};

// CRUD Operation - Create, Read, Update, Delete
export default function Posts() {
  const [posts, dispatch] = useReducer(reducer, []);
  const [formData, setFormData] = useState({
    id: "",
    userId: "",
    title: "",
    body: ""
  });

  const getPosts = async () => {
    const result = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    dispatch({ type: "get", data: result.data });
  };

  const createPosts = async () => {
    if (formData.id) {
      const result = await axios.put(
        `https://jsonplaceholder.typicode.com/posts/${formData.id}`,
        formData
      );
      dispatch({ type: "update", data: result.data });
    } else {
      const result = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        formData
      );
      dispatch({ type: "create", data: result.data });
    }
    setFormData({
      userId: "",
      title: "",
      body: ""
    });
  };

  const updatePosts = async post => {
    setFormData({
      id: post.id,
      userId: post.userId,
      title: post.title,
      body: post.body
    });
  };

  const deletePosts = async id => {
    const result = await axios.delete(
      `https://jsonplaceholder.typicode.com/posts/${id}`
    );
    dispatch({ type: "delete", data: result.data });
    alert("Open your console ,You can see empty deleted object")
  };
  

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  return (
    <>
      <h1 >List of Posts</h1>
    
      <button style={{margin:"10px"}} onClick={() => getPosts()}>Get Posts</button>

      <br />
      <input style={{margin:"10px",padding:'8px'}}
        type="text"
        onChange={e => handleChange("userId", e.target.value)}
        placeHolder="Enter user Id"
        value={formData.userId}
      />
      <br />
      <input style={{margin:"10px",padding:'8px'}}
        type="text"
        onChange={e => handleChange("title", e.target.value)}
        placeHolder="Enter title"
        value={formData.title}
      />
      <br />
      <textarea style={{margin:"10px",padding:'8px'}}
        onChange={e => handleChange("body", e.target.value)}
        placeHolder="Enter body"
        value={formData.body}
      />
      <br />
      <button style={{margin:"10px"}} onClick={createPosts}>
        {formData.id ? "Update Post" : "Create New Post"}
      </button>
      {posts.map(post => (
        <p  style={{margin:"10px",alignText:"center"}} key={post.id}><span>
          {post.id}. {post.title} {' --     '} {post.body}</span>
          <button style={{margin:"10px"}} onClick={() => updatePosts(post)}>Update</button>
          <button style={{margin:"10px"}} onClick={() => deletePosts(post.id)}>Delete</button>
        </p>
      ))}
    </>
  );
}