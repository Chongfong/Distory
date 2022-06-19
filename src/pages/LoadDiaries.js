import React, {
  useEffect, useState, useCallback,
} from 'react';
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import DOMPurify from 'dompurify';
import { db } from '../firestore/firestore';
import '../css/loadDiary.css';

export default function LoadDiaries() {
  const fetchDiaries = () => new Promise((resolve) => {
    const querySnapshot = getDocs(collection(db, 'articles'));
    resolve(querySnapshot);
  });

  const [userData, setUserData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const loadDiaries = useCallback(() => {
    const loadingDiaries = async () => {
      const output = [];
      fetchDiaries().then((querySnapshot) => {
        querySnapshot.forEach((querySnapshotdoc) => {
          output.push(querySnapshotdoc.data());
        });
        setUserData([...output]);
      });

      return (output);
    };
    loadingDiaries();
  }, []);

  useEffect(() => {
    loadDiaries();
  }, [loadDiaries]);

  function deleteDiary(id) {
    const updatedDiarys = [...userData].filter((diary) => diary.id !== id);
    setUserData(updatedDiarys);
  }

  function editDiaryTitle(id, e) {
    const updatedDiaryTitle = [...userData]
      .map((diary) => (diary.id === id ? { ...diary, title: e.target.value } : diary));
    setUserData(updatedDiaryTitle);
  }

  return (
    <ul>
      {userData.map((eachUser) => (
        <div className="diary">
          {
            isEditing
              ? (
                <form>
                  <input
                    type="text"
                    onBlur={(e) => {
                      editDiaryTitle(eachUser.id, e);
                      const docRef = doc(db, 'users', eachUser.id);
                      updateDoc(docRef, { title: e.target.value });
                    }}
                    defaultValue={eachUser.title}
                  />
                </form>
              )
              : <h1 onDoubleClick={() => setIsEditing(true)}>{eachUser.title}</h1>
            }
          <button
            type="button"
            onClick={() => {
              const docRef = doc(db, 'users', eachUser.id);
              deleteDoc(docRef).then(console.log('delete the diary'));
              deleteDiary(eachUser.id);
            }}
          >
            X

          </button>
          <div
            onDoubleClick={() => console.log('haha')}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(eachUser.content),
            }}
          />
          <h5>{new Date(eachUser.publishAt.seconds * 1000).toString()}</h5>
          <hr />
        </div>
      ))}
    </ul>
  );
}
