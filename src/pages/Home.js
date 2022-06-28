import React, {
  useEffect, useState, useCallback,
} from 'react';
import {
  collection,
  getDocs,
} from 'firebase/firestore';
import DOMPurify from 'dompurify';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../firestore/firestore';
import '../css/loadDiary.css';

export default function Home() {
  const fetchDiaries = () => new Promise((resolve) => {
    const querySnapshot = getDocs(collection(db, 'articles'));
    resolve(querySnapshot);
  });
  const navigate = useNavigate();

  const [allDiaries, setAllDiaries] = useState([]);
  const [isLogin] = useState(false);

  const loadDiaries = useCallback(() => {
    const loadingDiaries = async () => {
      const output = [];
      fetchDiaries().then((querySnapshot) => {
        querySnapshot.forEach((querySnapshotdoc) => {
          output.push(querySnapshotdoc.data());
        });
        setAllDiaries([...output]);
      });

      return (output);
    };
    loadingDiaries();
  }, []);

  useEffect(() => {
    loadDiaries();
  }, [loadDiaries]);

  return (
    <>
      <div>歡迎光臨</div>
      <Link to="/create">
        <button type="button">Create</button>

      </Link>
      <Link to="/diaries">
        <button type="button">Diaries</button>

      </Link>

      <Link to="/signup">
        <button type="button">Signup</button>

      </Link>

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
            <div
              role="button"
              tabIndex={0}
              onClick={() => {
                navigate(`/${eachDiary.author}/${eachDiary.diaryID}`);
              }}
              onKeyUp={() => {
                navigate(`/${eachDiary.author}/${eachDiary.diaryID}`);
              }}
            >
              <div dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(eachDiary.content),
              }}
              />
            </div>
            <h5>{ new Date(eachDiary.publishAt.seconds * 1000).toString()}</h5>
            <hr />
          </div>
        ))}
      </ul>
    </>
  );
}
