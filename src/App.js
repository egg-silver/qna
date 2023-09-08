import { Route, Routes } from 'react-router-dom';
import './App.css';
import QnA from './pages/QnA';
import Detail from './pages/Detail';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<QnA />} />
        <Route path='/qna/:id' element={<Detail/>} />
      </Routes>
    </>
  );
}

export default App;
