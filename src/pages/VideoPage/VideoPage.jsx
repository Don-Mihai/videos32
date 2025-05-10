import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './VideoPage.module.css'; // Импортируем CSS-модуль
import Bottom from '../../components/Bottom/Bottom';
import axios from 'axios';

export default function VideoPage() {
  const { videoId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const checkEvent = async () => {
      try {
        const { data: xmlString } = await axios.get(
          'http://192.168.0.10/state.xml',
          {
            responseType: 'text',
          }
        );
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlString, 'application/xml');
        const node = xml.getElementsByTagName('iovalue')[0];
        if (!node) {
          console.warn('<iovalue> не найден');
          return;
        }
        const str = node.textContent?.trim() ?? '';
        // 10‑й символ (индекс 9) — первый бит
        const isFirstOn = str.charAt(9) === '1';
        // 11‑й символ (индекс 10) — второй бит
        const isSecondOn = str.charAt(10) === '1';
        if (isFirstOn || isSecondOn) {
          navigate('/main');
        }
      } catch (e) {
        console.error('Ошибка получения/parsing XML:', e);
      }
    };

    const interval = setInterval(checkEvent, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <video className={styles.video} controls autoPlay>
        <source src={`/videos/video${videoId}.mp4`} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      <br />
      <Bottom />
    </div>
  );
}
