/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import React, { useState } from 'react';
import { db } from '../firestore/firestore';

export default function Search() {
  const [titleSearch, setTitleSearch] = useState();
  const [searchTitleResult, setSearchTitleResult] = useState();

  async function searchTitle() {
    try {
      const urlsRef = collection(db, 'articles');
      const q = query(urlsRef, where('author', '==', 'Kd1wyZRQUSNZT6U3T53ryc5fXMY2'), where('titleText', 'array-contains', [...titleSearch][0]));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDiariesAll = [];
        querySnapshot.forEach((eachDiary) => {
          if (eachDiary.data()
            .title
            .includes(titleSearch)) { userDiariesAll.push(eachDiary.data()); }
        });
        setSearchTitleResult(userDiariesAll);
        return userDiariesAll;
      }
    } catch (e) {
      alert('Error querying document: ', e);
      return e.response;
    } return true;
  }

  return (
    <>
      <div>標題搜尋</div>
      <input
        type="text"
        value={titleSearch}
        onChange={(e) => setTitleSearch(e.target.value)}
      />
      <button type="button" onClick={() => { searchTitle(); }}>執行</button>

      {searchTitleResult ? (searchTitleResult.map((eachResult) => (
        <>
          <div>{eachResult.title}</div>
          <div>{eachResult.content}</div>
          <div>
            {' '}
            {eachResult.author}
          </div>
        </>
      ))) : ('')}

    </>
  );
}
