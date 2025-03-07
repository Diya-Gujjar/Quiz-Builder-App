import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react'
import Register from './components/Register';
import SignIn from './components/SignIn';
import Home from './components/Home';
import QuizCreate from './components/QuizCreate';
import Quiz from './components/Quiz';
import QuestionCreate from './components/QuestionCreate';
import UserDashboard from './components/UserDashboard';
import NoPage from './components/NoPage';
import Header from './components/Header';

function App() {
  const [isRegistered, setIsRegistered] = useState();
  const [isPublished, setIsPublished] = useState(false);
  const [topic, setTopic] = useState('');
  const [noOfQues, setNoOfQues] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [inputValue, setInputValue] = useState('');

  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>

          <Route path="/" element={
            <Home
              inputValue={inputValue}
              setInputValue={setInputValue} />}
          />

          <Route path="/register" element={
            <Register setIsRegistered={setIsRegistered} />} />

          <Route path="/signin" element={
            <SignIn setIsRegistered={setIsRegistered} />} />

          <Route path="/quizCreate" element={
            isRegistered ? <QuizCreate
              topic={topic}
              setTopic={setTopic}
              noOfQues={noOfQues}
              setNoOfQues={setNoOfQues}
            /> : <Register setIsRegistered={setIsRegistered} />} />

          <Route path="/quiz" element={
            <Quiz
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
              inputlink={inputValue}
              setInputValue={setInputValue}
              noOfQues={noOfQues} />}
          />

          <Route path="/questionCreate" element={
            !isPublished && (<QuestionCreate
              setIsPublished={setIsPublished}
              noOfQues={noOfQues}
              topic={topic}
            />)} />

          <Route path="/userDashboard" element={
            <UserDashboard setIsRegistered={setIsRegistered} />} />

          <Route path="*" element={<NoPage />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
