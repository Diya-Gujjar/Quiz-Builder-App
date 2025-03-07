import React, { useState, useEffect } from 'react';
import Options from './Options';
import Score from './Score';
import "../App.css";

function QuestionBank({
  questions,
  currentQuestion,
  setCurrentQuestion,
  setIsLastq,
  isLastq,
}) {
  const question = questions[currentQuestion];
  const [timer, setTimer] = useState(10);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [answerChecked, setAnswerChecked] = useState(false);

  useEffect(() => {
    setScore(0);
    setAnswerChecked(false);
  }, []);

  const onOptionChange = (e) => {
    if (question.answerType === 'single') {
      setSelectedOption([e.target.value]);
    } else {
      const newSelectedOptions = selectedOption.includes(e.target.value)
        ? selectedOption.filter(option => option !== e.target.value)
        : [...selectedOption, e.target.value];
      setSelectedOption(newSelectedOptions);
    }
  };

  const checkAnswer = () => {
    if (question.answerType === 'single') {
      if (selectedOption[0] === question.correctAnswer) {
        setScore(prevScore => prevScore + 1);
      }
    } else {
      const correctAnswers = question.correctAnswer.split(',');
      const isCorrect = selectedOption.length === correctAnswers.length &&
        selectedOption.every(option => correctAnswers.includes(option));
      if (isCorrect) {
        setScore(prevScore => prevScore + 1);
      }
    }
    setAnswerChecked(true);
  };

  const handleNextQues = () => {
    if (!answerChecked) {
      checkAnswer();
    }
    if (currentQuestion + 1 === questions.length) {
      setCurrentQuestion(0);
      setIsLastq(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setTimer(10);
      setSelectedOption("");
      setAnswerChecked(false);
    }
  };

  useEffect(() => {
    if (timer === 0) {
      handleNextQues();
    }
    const timeleft = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timeleft);
  }, [timer]);

  if (currentQuestion >= questions.length) {
    return <Score score={score} totalQuestions={questions.length} />;
  }
  return (
    <div>
      {(isLastq) ? <Score score={score} totalQuestions={questions.length} /> :
        (<div>
          <h1 className='question-heading'>Question</h1>
          <div className="question-container">
            <div className="question-timer">
              <div> Question {currentQuestion + 1}</div>
              <div>Timer: {timer}</div>
            </div>

            <div>{question.question}</div>

            <form onSubmit={(e) => e.preventDefault()}>

              <Options
                options={question.options}
                selectedOption={selectedOption}
                onOptionChange={onOptionChange}
                isMultiple={question.answerType === 'multiple'}
              />
              <div className='nxt-btn'>
                <button type="button" onClick={handleNextQues}>
                  NEXT
                </button>
              </div>
            </form>
          </div>
        </div>
        )}
    </div>
  );
}

export default QuestionBank;