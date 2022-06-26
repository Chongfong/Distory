import React from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  return (
    <>
      <div>您已完成登錄</div>
      <Link to="/">
        <button type="button">開始使用</button>

      </Link>
      <Link to="/blogedit">
        <button type="button">編輯設定</button>

      </Link>
    </>
  );
}
