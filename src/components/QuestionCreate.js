import React, { useState, useEffect } from 'react';

function QuestionCreate({ noOfQues, setIsPublished, topic }) {
  const [questions, setQuestions] = useState([]);
  const [quizLink, setQuizLink] = useState('');

  useEffect(() => {
    setQuestions(Array.from({ length: noOfQues }).map(() => ({
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      answerType: 'single'
    })));
  }, [noOfQues]);

  const handleChange = (e, index, field, optIndex = null) => {
    const updatedQuestions = [...questions];
    if (field === 'options' && optIndex !== null) {
      updatedQuestions[index].options[optIndex] = e.target.value;
    } else {
      updatedQuestions[index][field] = e.target.value;
    }
    setQuestions(updatedQuestions);
  };

  const generateSequence = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    setQuizLink(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateSequence();
  };
  useEffect(() => {
    if (quizLink) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, [quizLink]);
  const publishQuiz = () => {
    const userEmail = JSON.parse(localStorage.getItem("userLoggedIn")).email;
    const quizData = {
      topic,
      questions, // Questions that were created
      isPublished: true,
      createdBy: userEmail,
    };
   
    localStorage.setItem(quizLink, JSON.stringify(quizData));
    alert('Quiz Published! You can now share the quiz link.');
    setIsPublished(true);
  };

  return (
    <div>
      <h2>Create the Questions</h2>
      <form onSubmit={handleSubmit}>
        {questions.map((_, index) => (
          <div key={index} className="container">
            <h3>Question {index + 1}</h3>
            <div className='inputlbl'>
              <label>Question</label>
              <input
                type="text"
                value={questions[index]?.question || ''}
                onChange={(e) => handleChange(e, index, 'question')}
                placeholder="Enter question"
                required
              />
            </div>
            <div className='inputlbl'>
              <label>Enter Options</label>
              {questions[index]?.options.map((option, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  value={option || ''}
                  onChange={(e) => handleChange(e, index, 'options', optIndex)}
                  placeholder={`Enter option ${optIndex + 1}`}
                  required
                />
              ))}
            </div>
            <div className='inputlbl'>
              <label>Correct Answer(s)</label>
              <input
                type="text"
                value={questions[index]?.correctAnswer || ''}
                onChange={(e) => handleChange(e, index, 'correctAnswer')}
                placeholder="Enter correct answer(s), comma separated for multiple"
                required
              />
            </div>
            <div className='inputlbl'>
              <label>Answer Type</label>
              <select
                value={questions[index]?.answerType}
                onChange={(e) => handleChange(e, index, 'answerType')}>
                <option value="single">Single Answer</option>
                <option value="multiple">Multiple Answers</option>
              </select>
            </div>
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>
      {quizLink && (
        <div>
          <h3>Quiz Created Successfully!</h3>
          <p>Below is the link to the quiz:</p>
          <p>{quizLink}</p>
          <div>
            <button onClick={publishQuiz}>Publish Quiz</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default QuestionCreate;