/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  collection, limit, orderBy, query, getDocs,
  startAfter, endBefore, endAt,
} from 'firebase/firestore';
import { db } from '../firestore/firestore';

export default function Pagination() {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [lastItem, setLastItem] = useState();
  const urlsRef = collection(db, 'articles');

  useEffect(() => {
    const fetchData = async () => {
      const q = query(urlsRef, orderBy('publishAt', 'desc'), limit(2));
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
      console.log('first item ', items[0]);
      setList(items);
    };
    fetchData();
  }, []);

  const showNext = () => {
    if (list.length === 0) {
      alert('Thats all we have for now !');
    }
    if (page === 1) {
      const fetchNextData = async () => {
        const q = query(urlsRef, orderBy('publishAt', 'desc'), limit(2));
        const querySnapshot = await getDocs(q);

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        console.log('last', lastVisible);

        const next = query(urlsRef, orderBy('publishAt', 'desc'), startAfter(lastVisible), limit(2));
        const nextDatas = await getDocs(next);
        const items = [];
        nextDatas.forEach((doc) => {
          console.log(doc.data().title);
          items.push({
            title: doc.data().title,
            content: doc.data().content,
            publishAt: doc.data().publishAt,
            ...doc.data(),
          });
        });
        setList(items);
        setPage(page + 1);
        setLastItem(lastVisible);
      };
      console.log(list);
      fetchNextData();
    } else {
      const fetchNextData = async () => {
        const q = query(urlsRef, orderBy('publishAt', 'desc'), startAfter(lastItem), limit(2));
        const querySnapshot = await getDocs(q);

        const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
        console.log('last', lastVisible);

        const next = query(urlsRef, orderBy('publishAt', 'desc'), startAfter(lastVisible), limit(2));
        const nextDatas = await getDocs(next);
        const items = [];
        nextDatas.forEach((doc) => {
          console.log(doc.data().title);
          items.push({
            title: doc.data().title,
            content: doc.data().content,
            publishAt: doc.data().publishAt,
            ...doc.data(),
          });
        });
        setList(items);
        setPage(page + 1);
        setLastItem(lastVisible);
      };
      console.log(list);
      fetchNextData();
    }
  };

  const showPrevious = () => {
    const fetchLastData = async () => {
      console.log(lastItem.data());
      const q = query(urlsRef, orderBy('publishAt', 'desc'), limit(2));
      const querySnapshot = await getDocs(q);

      const previousVisible = querySnapshot.docs[0];
      console.log(previousVisible.data());
      //   console.log('previous', previousVisible.data());

      //   const last = query(
      //     urlsRef,
      //     orderBy('publishAt', 'desc'),
      //     endBefore(previousVisible),
      //     limit(2),
      //   );

      const last = query(
        urlsRef,
        orderBy('publishAt', 'desc'),
        endAt(lastItem),
        limit(3),
      );
      const lastDatas = await getDocs(last);
      const items = [];
      lastDatas.forEach((doc) => {
        console.log(doc.data().title);
        items.push({
          title: doc.data().title,
          content: doc.data().content,
          publishAt: doc.data().publishAt,
          ...doc.data(),
        });
      });
      setList(items);
      setPage(page - 1);
    };
    console.log(list);
    fetchLastData();
  };

  //   const showPrevious = ({ item }) => {
  //     const fetchPreviousData = async () => {
  //       const q = query(urlsRef, orderBy('publishAt', 'desc'), limit(2), endBefore(item));
  //       const querySnapshot = await getDocs(q);
  //       const items = [];
  //       querySnapshot.forEach((doc) => {
  //         items.push({
  //           title: doc.data().title,
  //           content: doc.data().content,
  //           publishAt: doc.data().publishAt,
  //           ...doc.data(),
  //         });
  //       });
  //       setList(items);
  //       setPage(page - 1);
  //     };
  //     fetchPreviousData();
  //   };

  return (
    <>
      {
                // list doc's here
                list.map((doc) => (
                  <>
                    <p>{doc.title}</p>
                    <p>{doc.content}</p>
                  </>
                ))
            }
      <div>
        {
                // show previous button only when we have items
                page === 1 ? ''
                  : <button type="button" onClick={() => showPrevious()}>Previous</button>
            }

        {
                // show next button only when we have items
                list.length < 2 ? ''
                  : <button type="button" onClick={() => showNext()}>Next</button>
            }
      </div>

    </>
  );
}
