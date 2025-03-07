import React, { useEffect, useState } from 'react';
import QuestionBank from './QuestionBank';
import Score from './Score';
import Home from './Home';

function Quiz({ currentQuestion, setCurrentQuestion, inputlink, setInputValue, noOfQues }) {
  useEffect(() => { setCurrentQuestion(noOfQues); }, [])
  const [isLastq, setIsLastq] = useState(false);
  const storedData = localStorage.getItem(inputlink);

  if (!storedData) {
    return <div>
      <Home inputValue={inputlink} setInputValue={setInputValue} />
    </div>;
  }
  const quizData = JSON.parse(storedData);
  const questions = quizData?.questions || [];

  return (
    <div>
      {currentQuestion < questions.length ? (
        <QuestionBank
          questions={questions}
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          isLastq={isLastq}
          setIsLastq={setIsLastq}
        />
      ) : (
        <Score />
      )}
    </div>
  );
}

export default Quiz;