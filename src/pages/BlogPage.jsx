import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import './BlogPage.css';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchDate, setSearchDate] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/blogs');
      setBlogs(response.data);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearchTerm = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !searchCategory || blog.category === searchCategory;
    const matchesDate = !searchDate || moment(blog.createdAt).format('YYYY-MM-DD') === searchDate;
    return matchesSearchTerm && matchesCategory && matchesDate;
  });

  return (
    <div className="blog-page">
      <h1>Blogs</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Health">Health</option>
          <option value="Social Activities">Social Activities</option>
          <option value="Orphan Care">Orphan Care</option>
          <option value="Education">Education</option>
        </select>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
        />
      </div>
      <div className="blog-list">
        {filteredBlogs.map((blog) => (
          <div className="blog-item" key={blog._id}>
            <Link to={`/blogpost/${blog._id}`}>
              <h2>{blog.title}</h2>
              {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
            </Link>
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content.substring(0, 200) }} />
            <p>Category: {blog.category}</p>
            <p>Created At: {moment(blog.createdAt).format('DD MMM YYYY')}</p>
            <Link to={`/blogpost/${blog._id}`} className="read-more">Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
