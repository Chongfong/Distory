import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { db } from '../../utils/firestore';
import edit from '../../img/edit.png';
import { BlogArticleEditImage } from '../../pages/blogArticle/BlogArticle.style';
import { EditDiaryEachDiaryRow } from '../../pages/createNewDiary/CreateNewDiaries.style';

import { transformTimeToDate } from '../../utils/ShareFunctions';

export default function ChooseEditArtices({
  setTitleValue, setDiaryContentValue,
  isChoosing, setIsChoosing,
}) {
  const { userID } = useParams();
  const navigate = useNavigate();
  const [draftDiaries, setDraftDiaries] = useState();

  const searchDraftDiariesCallback = useCallback(() => {
    async function searchDraftDiaries() {
      try {
        const urlsRef = collection(db, 'articles');
        const q = query(urlsRef, where('author', '==', userID), where('status', '==', 'draft'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          const draftDiariesAll = [];
          querySnapshot.forEach((eachDiary) => { draftDiariesAll.push(eachDiary.data()); });
          setDraftDiaries(draftDiariesAll);
        }
        return false;
      } catch (e) {
        toast('施工中，返回首頁', {
          autoClose: 2000,
        });
        navigate('/');
        return e.response;
      }
    }
    searchDraftDiaries();
  }, [navigate, userID]);

  useEffect(() => {
    searchDraftDiariesCallback();
  }, [searchDraftDiariesCallback]);

  return (
    <>
      {isChoosing ? (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          width: '100%',
          height: 'calc( 90vh - 200px)',
          alignContent: 'flex-start',
        }}
        >
          <div style={{ display: 'flex', flexWrap: 'no-wrap', flexBasis: '100%' }}>
            <p style={{ flexBasis: 'auto' }}>日期</p>
            <p style={{ flexBasis: '80%' }}>標題</p>
          </div>
          {draftDiaries ? (draftDiaries.map((eachDiary) => (
            <EditDiaryEachDiaryRow
              style={{ display: 'flex', flexWrap: 'no-wrap', flexBasis: '100%' }}
              onClick={() => {
                setTitleValue(eachDiary.title);
                setDiaryContentValue(eachDiary.content);
                setIsChoosing(false);
                navigate(`/${userID}/edit/${eachDiary.diaryID}`);
              }}
              onKeyUp={() => {
                setTitleValue(eachDiary.title);
                setDiaryContentValue(eachDiary.content);
              }}
              role="button"
              tabIndex={0}
            >
              <p style={{ flexBasis: '10%' }}>{transformTimeToDate(eachDiary.publishAt.seconds * 1000)}</p>
              <p style={{ flexBasis: '80%', textAlign: 'left', padding: '0px 20px' }}>{eachDiary.title}</p>
              <p style={{ flexBasis: '5%' }}><BlogArticleEditImage src={edit} alt="edit" /></p>
            </EditDiaryEachDiaryRow>
          ))) : (<p>您沒有編輯中文章喔！</p>)}

        </div>
      ) : ('')}
      {}
    </>
  );
}

ChooseEditArtices.propTypes = {
  setTitleValue: PropTypes.func,
  setDiaryContentValue: PropTypes.func,
  isChoosing: PropTypes.string,
  setIsChoosing: PropTypes.func,
};

ChooseEditArtices.defaultProps = {
  setTitleValue: () => {},
  setDiaryContentValue: () => {},
  isChoosing: '',
  setIsChoosing: () => {},
};
