import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function UserDashboard({ setIsRegistered }) {
  const [userQuizzes, SetUserQuizzes] = useState([]);
  const navigate = useNavigate();
  const userEmail = JSON.parse(localStorage.getItem("userLoggedIn")).email;

  useEffect(() => {
    const allQuizzes = [];
    for (let i = 0; i < localStorage.length; i++) {
      const quizKey = localStorage.key(i);
      const quizData = JSON.parse(localStorage.getItem(quizKey));
      if (quizData && quizData.createdBy === userEmail) {
        allQuizzes.push({ ...quizData, link: quizKey });
      }
    }
    SetUserQuizzes(allQuizzes);
  }, []);

  const handleDeleteQuiz = (quizLink) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      localStorage.removeItem(quizLink);
      SetUserQuizzes(userQuizzes.filter((quiz) => quiz.link !== quizLink));
      alert('Quiz deleted!');
    }
  };

  const handleEditQuiz = () => {
    alert("You can't edit the quiz once it's published.");
  };

  const handleClick = () => {
    setIsRegistered(true);
    navigate("/quizCreate");
  }

  return (
    <div>
      <h1>Your Created Quizzes</h1>
      <div>
        {userQuizzes.length > 0 ? (
          userQuizzes.map((quiz, index) => (
            <div key={index} className='container'>
              <h3>Topic : {quiz.topic}</h3>
              <div><h4>Quiz Link: {quiz.link}</h4></div>
              <button onClick={() => handleEditQuiz}>Edit Quiz (Disabled)</button>
              <button onClick={() => handleDeleteQuiz(quiz.link)}>Delete Quiz</button>
            </div>
          ))
        ) : (
          <div> <p>You have not created any quizzes yet.</p><br />
          </div>
        )}
      </div>
      <button type='click' onClick={handleClick}>Create Quiz</button>
    </div>
  );
}

export default UserDashboard;