import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './AdminBlog.css';
import moment from 'moment';

const AdminBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [category, setCategory] = useState('');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBlog = { title, content, tags: tags.split(','), imageUrl, category };
      await axios.post('http://localhost:5000/api/blogs', newBlog);
      fetchBlogs();
      setTitle('');
      setContent('');
      setTags('');
      setImageUrl('');
      setCategory('');
    } catch (error) {
      console.error('Error creating blog:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      fetchBlogs();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearchTerm = blog.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !searchCategory || blog.category === searchCategory;
    const matchesDate = !searchDate || moment(blog.createdAt).format('YYYY-MM-DD') === searchDate;
    return matchesSearchTerm && matchesCategory && matchesDate;
  });

  return (
    <div className="admin-blog">
      <h1>Admin Blog Management</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <ReactQuill value={content} onChange={setContent} className="quill-container" />
        </div>
        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            placeholder="Tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="" disabled>Select Category</option>
            <option value="Health">Health</option>
            <option value="Social Activities">Social Activities</option>
            <option value="Orphan Care">Orphan Care</option>
            <option value="Education">Education</option>
            {/* Add more categories as needed */}
          </select>
        </div>
        <button type="submit">Create Blog</button>
      </form>
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
          {/* Add more categories as needed */}
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
            <h2>{blog.title}</h2>
            <p>Category: {blog.category}</p>
            <p>Created At: {moment(blog.createdAt).format('DD MMM YYYY')}</p>
            {blog.imageUrl && <img src={blog.imageUrl} alt={blog.title} />}
            <div className="blog-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
            <p>Tags: {blog.tags.join(', ')}</p>
           
            <button className="delete" onClick={() => handleDelete(blog._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBlog;
