'use client'

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onClickMethod = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      console.log('ボタンが押されました！');
      
      // LINEで、ボタンが押されたことを通知する
      await axios.post('/api/linebot', {
        message: 'ボタンが押されました！',
      });

      setMessage('通知が送信されました！');
    } catch (error) {
      console.error('エラーが発生しました:', error);
      setMessage('通知の送信に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>LINEボット通知システム</h1>
      <button 
        onClick={onClickMethod} 
        disabled={isLoading}
        className="notifyButton"
      >
        {isLoading ? '送信中...' : '通知を送信'}
      </button>
      {message && <p className="message">{message}</p>}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          font-family: Arial, sans-serif;
        }
        .notifyButton {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #00b900;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        .notifyButton:hover {
          background-color: #009900;
        }
        .notifyButton:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        .message {
          margin-top: 1rem;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}