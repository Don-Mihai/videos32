import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Main.module.css'; // Импортируем CSS-модуль

const videos = [
  { title: 'Видео 1', link: '/video/1' },
  { title: 'Видео 2', link: '/video/2' },
  { title: 'Видео 3', link: '/video/3' },
  { title: 'Видео 4', link: '/video/4' },
];

export default function Main() {
  const navigate = useNavigate();

  const handleVideoClick = (link) => {
    navigate(link); // Переход к странице с видео
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        ВЫБЕРИТЕ РОЛИК, <br /> ЧТОБЫ ЗАПУСТИТЬ ЕГО НА ЭКРАНЕ
      </h1>
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
