/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import {
  collection, orderBy, query, getDocs, where,
} from 'firebase/firestore';
import { db } from '../firestore/firestore';

export default function Pagination() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);
  const totalPages = useRef();

  const urlsRef = collection(db, 'articles');

  useEffect(() => {
    const fetchData = async () => {
      const q = query(urlsRef, where('author', '==', 'Kd1wyZRQUSNZT6U3T53ryc5fXMY2'), orderBy('publishAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({
          title: doc.data().title,
          content: doc.data().content,
          publishAt: doc.data().publishAt,
          ...doc.data(),
        });
      });
      setList(items);
      totalPages.current = (Math.ceil(items.length / 2));
    };
    fetchData();
  }, []);

  return (
    <>
      { page !== 0
        ? (list.slice(page * 2, page * 2 + 2).map((doc) => (
          <>
            <p>{doc.title}</p>
            <p>{doc.content}</p>
          </>
        ))) : ((list.slice(0, 2).map((doc) => (
          <>
            <p>{doc.title}</p>
            <p>{doc.content}</p>
          </>
        ))))}
      {totalPages ? (Array.from(Array(totalPages.current).keys())).map(
        (eachPage) => (
          <div
            onClick={() => setPage(eachPage)}
            onKeyUp={() => setPage(eachPage)}
            role="button"
            tabIndex={0}
          >
            {eachPage + 1}
          </div>
        ),
      ) : ('')}

    </>
  );
}
