import React from 'react';

function Score({ score, totalQuestions }) {
  return (
    <div>
      <h1>Score</h1>
      <div className='score-container'>
        <h2>Quiz Completed!</h2>
        <p>You answered {score}/{totalQuestions} questions correctly.</p>
      </div>
    </div>
  );
}

export default Score;