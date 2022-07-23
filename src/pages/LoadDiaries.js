import React, {
  useEffect, useState, useCallback,
} from 'react';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import DOMPurify from 'dompurify';
import { Link } from 'react-router-dom';
import { db } from '../firestore/firestore';
import '../css/loadDiary.css';

export default function LoadDiaries() {
  const fetchDiaries = () => new Promise((resolve) => {
    const querySnapshot = getDocs(collection(db, 'articles'));
    resolve(querySnapshot);
  });

  const [allDiaries, setAllDiaries] = useState([]);
  const [isLogin] = useState(false);

  const loadDiaries = useCallback(() => {
    const loadingDiaries = async () => {
      try {
        const output = [];
        const querySnapshot = await fetchDiaries();
        querySnapshot.forEach((querySnapshotdoc) => {
          output.push(querySnapshotdoc.data());
        });
        setAllDiaries([...output]);
        return (output);
      } catch (e) {
        return e.response;
      }
    };
    loadingDiaries();
  }, []);

  useEffect(() => {
    loadDiaries();
  }, [loadDiaries]);

  function deleteDiary(id) {
    const updatedDiarys = [...allDiaries].filter((diary) => diary.diaryID !== id);
    setAllDiaries(updatedDiarys);
  }

  return (
    <ul>
      {allDiaries.map((eachDiary) => (
        <div className="diary">
          {
            isLogin
              ? (
                <h1>{eachDiary.title}</h1>
              )
              : (
                <h1>{eachDiary.title}</h1>
              )
            }
          <button
            type="button"
            onClick={() => {
              const docRef = doc(db, 'users', eachDiary.id);
              deleteDoc(docRef).then();
              deleteDiary(eachDiary.id);
            }}
          >
            X

          </button>
          <div
            onDoubleClick={() => {}}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(eachDiary.content),
            }}
          />
          <Link
            to={`/edit/${eachDiary.diaryID}`}
          >
            💗

          </Link>
          <h5>{new Date(eachDiary.publishAt.seconds * 1000).toString()}</h5>
          <hr />
        </div>
      ))}
    </ul>
  );
}
