import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Main.module.css'; // Импортируем CSS-модуль

const videos = [{ title: 'Начать просмотр', link: '/video/1' }];

export default function Main() {
  const navigate = useNavigate();

  const handleVideoClick = (link) => {
    navigate(link); // Переход к странице с видео
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ИСТОРИЯ НОВОРОССИИ</h1>
      <div className={styles.videos}>
        {videos.map((video, index) => (
          <button
            key={index}
            onClick={() => handleVideoClick(video.link)}
            className={styles.button}
          >
            {video.title}
          </button>
        ))}
      </div>
    </div>
  );
}
