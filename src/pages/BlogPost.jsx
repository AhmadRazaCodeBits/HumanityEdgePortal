import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
        setError('Error fetching blog');
      }
    };

    fetchBlog();
  }, [id]);

  if (error) return <div>{error}</div>;

  return (
    <div className="blog-post-container">
      {blog ? (
        <div className="blog-post">
          <h1>{blog.title}</h1>
          <p className="blog-date">{new Date(blog.createdAt).toLocaleDateString()}</p>
          <img src={blog.imageUrl} alt={blog.title} className="blog-image" />
          <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BlogPost;
