// src/pages/VideoPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactPlayer from 'react-player';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './VideoPage.css';

const predefinedCategories = ['Education', 'Entertainment', 'Sports', 'News'];

const VideoPage = () => {
  const [videos, setVideos] = useState([]);
  const [categories, setCategories] = useState(predefinedCategories);

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get('http://localhost:5000/api/videos');
      setVideos(response.data);
    };

    fetchVideos();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="video-page">
      {categories.map(category => (
        <div key={category}>
          <h2>{category}</h2>
          <Slider {...sliderSettings}>
            {videos.filter(video => video.category === category).map(video => (
              <div key={video._id} className="video-card">
                <a href={video.videoUrl || `http://localhost:5000${video.videoFile}`} target="_blank" rel="noopener noreferrer">
                  <ReactPlayer url={video.videoUrl || `http://localhost:5000${video.videoFile}`} light={true} controls={true} width="100%" />
                  <h3>{video.title}</h3>
                </a>
                <p>{video.category}</p>
              </div>
            ))}
          </Slider>
        </div>
      ))}
    </div>
  );
};

export default VideoPage;
