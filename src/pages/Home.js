import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <div>歡迎光臨</div>
      <Link to="/create">
        <button type="button">Create</button>

      </Link>
      <Link to="/diaries">
        <button type="button">Diaries</button>

      </Link>
    </>
  );
}
