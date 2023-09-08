import React, { useState, useEffect } from 'react';
import { fetchComplaints } from '../utils/api';
import { Link } from 'react-router-dom';
import './QnA.css';

export default function QnA() {
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5; // 한 페이지에 보여질 항목 수
  const [visiblePageNumbers, setVisiblePageNumbers] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    const fetchData = async (page) => {
      try {
        const data = await fetchComplaints(page);
        setComplaints(data.data.contents);
        setTotalPages(data.data.totalElements);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    if (currentPage + itemsPerPage <= totalPages) {
      setCurrentPage(currentPage + itemsPerPage);
      updateVisiblePageNumbers(currentPage + itemsPerPage);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage - itemsPerPage >= 1) {
      setCurrentPage(currentPage - itemsPerPage);
      updateVisiblePageNumbers(currentPage - itemsPerPage);
    }
  };

  const updateVisiblePageNumbers = (startPage) => {
    const newVisiblePageNumbers = [];
    for (let i = startPage; i < startPage + itemsPerPage; i++) {
      if (i <= totalPages) {
        newVisiblePageNumbers.push(i);
      }
    }
    setVisiblePageNumbers(newVisiblePageNumbers);
  };

  const renderPageNumbers = () => {
    return visiblePageNumbers.map((pageNumber) => (
      <span
        key={pageNumber}
        className={pageNumber === currentPage ? 'active-page' : 'page-number'}
        onClick={() => handlePageChange(pageNumber)}
      >
        {pageNumber}
      </span>
    ));
  };

  return (
    <div className='qna-container'>
      <h2>사용자 컴플레인 리스트</h2>
      {isLoading ? (
        <p className='loading-text'>Loading...</p>
      ) : (
        <>
          <table className='complaints-table'>
            <thead>
              <tr>
                <th>No</th>
                <th>제목</th>
                <th>생성일</th>
                <th>답변 완료 여부</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((complaint, index) => (
                <tr key={index}>
                  <td>{complaint.id}</td>
                  <td>
                    <Link to={`/qna/${complaint.id}`}>{complaint.title}</Link>
                  </td>
                  <td>{complaint.createdAt}</td>
                  <td>{complaint.isDone ? '완료' : '미완료'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='pagination'>
            <button
              onClick={handlePreviousPage}
              disabled={currentPage === 1}
            >
              이전 페이지
            </button>
            {renderPageNumbers()}
            <button
              onClick={handleNextPage}
              disabled={currentPage + itemsPerPage > totalPages}
            >
              다음 페이지
            </button>
          </div>
        </>
      )}
    </div>
  );
}
