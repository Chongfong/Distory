import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  collection, getDocs, query, where,
} from 'firebase/firestore';
import PropTypes from 'prop-types';
import { db } from '../../utils/firestore';
import edit from '../../img/edit.png';
import {
  ChooseEditOuterContainer, ChooseEditTitleContainer, ChooseEditTitleDate,
  ChooseEditTitle, ChooseEditEachDiaryRow, ChooseEditTime, ChooseEditDiaryTitle,
  ChooseEditDiaryPencilContainer, ChooseEditEditImage,
} from './ChooseEditArticle.style';

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
      {isChoosing && (
        <ChooseEditOuterContainer>
          <ChooseEditTitleContainer>
            <ChooseEditTitleDate>日期</ChooseEditTitleDate>
            <ChooseEditTitle>標題</ChooseEditTitle>
          </ChooseEditTitleContainer>
          {draftDiaries ? (draftDiaries.map((eachDiary, index) => (
            <ChooseEditEachDiaryRow
              key={`draft-diary-${Date.now() + index}`}
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
              <ChooseEditTime>
                {transformTimeToDate(eachDiary.publishAt.seconds * 1000)}
              </ChooseEditTime>
              <ChooseEditDiaryTitle>{eachDiary.title}</ChooseEditDiaryTitle>
              <ChooseEditDiaryPencilContainer><ChooseEditEditImage src={edit} alt="edit" /></ChooseEditDiaryPencilContainer>
            </ChooseEditEachDiaryRow>
          ))) : (<p>您沒有編輯中文章喔！</p>)}

        </ChooseEditOuterContainer>
      )}
      {}
    </>
  );
}

ChooseEditArtices.propTypes = {
  setTitleValue: PropTypes.func,
  setDiaryContentValue: PropTypes.func,
  isChoosing: PropTypes.bool,
  setIsChoosing: PropTypes.func,
};

ChooseEditArtices.defaultProps = {
  setTitleValue: () => {},
  setDiaryContentValue: () => {},
  isChoosing: false,
  setIsChoosing: () => {},
};
