import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchComplaintDetail, updateComplaintAnswer } from '../utils/api';
import './Detail.css';

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [complaint, setComplaint] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleChangeInput = ({ target }) => {
    const { name, value } = target;
    setInputValue((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchComplaintDetail(id);
        setComplaint(data.data);
      } catch (error) {
        console.error('Error fetching complaint detail:', error);
      }
    };
    fetchData();
  }, [id]);

  const handleAnswerSubmit = async () => {
    try {
      const response = await updateComplaintAnswer(id, inputValue.answer);
      console.log(response);
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };
  const handleGoBack = () => {
    navigate(-1); // 뒤로 가기 동작 수행
  };

  return (
    <div className='detail-container'>
      <h2 className='detail-title'>컴플레인 디테일 페이지</h2>
      {complaint ? (
        <div>
          <h3>{complaint.title}</h3>
          <p className='detail-info'>번호: {complaint.id}</p>
          <p className='detail-info'>제목: {complaint.content}</p>
          <p className='detail-info'>생성일: {complaint.createdAt}</p>
          <h3 className='detail-content'>상세내용</h3>
          <textarea
            name='detail'
            className='detail-textarea'
            rows='5'
            onChange={handleChangeInput}
          ></textarea>
          <h3 className='detail-content'>답변 내용 작성</h3>
          <textarea
            name='answer'
            className='detail-textarea'
            rows='5'
            onChange={handleChangeInput}
          ></textarea>
          <button className='detail-button' onClick={handleAnswerSubmit}>
            답변작성완료
          </button>
          <button className='detail-button' onClick={handleGoBack}>
            목록으로 돌아가기
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
