// src/pages/AdminVideo.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import './AdminVideo.css';

const predefinedCategories = ['Education', 'Entertainment', 'Sports', 'News'];

const AdminVideo = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(predefinedCategories[0]);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [videos, setVideos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get('http://localhost:5000/api/videos');
      setVideos(response.data);
    };

    fetchVideos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    if (videoUrl) {
      formData.append('videoUrl', videoUrl);
    } else {
      formData.append('videoFile', videoFile);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/videos', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setMessage('Video uploaded successfully');
      setVideos([response.data, ...videos]);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error uploading video:', error);
      setMessage('Error uploading video');
      setTimeout(() => setMessage(''), 3000);
    }
  };

 
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      setVideos(videos.filter(video => video._id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <div className="admin-video">
      <h2>Upload Video</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Category</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          {predefinedCategories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <label>Video URL</label>
        <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
        <label>Or Upload Video File</label>
        <input type="file" onChange={(e) => setVideoFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
      <h2>Uploaded Videos</h2>
      <div className="video-grid">
        {videos.map(video => (
          <div key={video._id} className="video-card">
            <a href={video.videoUrl || `http://localhost:5000${video.videoFile}`} target="_blank" rel="noopener noreferrer">
              <ReactPlayer url={video.videoUrl || `http://localhost:5000${video.videoFile}`} light={true} controls={true} width="100%" />
              <h3>{video.title}</h3>
            </a>
            <p>{video.category}</p>
            <button onClick={() => handleDelete(video._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminVideo;
