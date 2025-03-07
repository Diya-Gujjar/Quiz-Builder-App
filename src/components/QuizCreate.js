import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"

function QuizCreate({ topic, setTopic, noOfQues, setNoOfQues }) {
  const navigate = useNavigate();

  const handleChange = (event) => {
    setTopic(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (noOfQues >= 1 && noOfQues <= 10) {
      navigate('/questioncreate');
    } else {
      alert('Quiz should consist of 1 to 10 questions.');
    }
  };


  const questionNo = (e) => {
    setNoOfQues(e.target.value);
  };

  return (
    <div>
      <h1>Quiz</h1>
      <h3>Enter Topic of New Quiz to be created</h3>
      <form onSubmit={handleSubmit}>
        <div className='container'>
          <div className='inputlbl'>
            <label htmlFor='topic'>Topic</label>
            <input
              name="topic"
              placeholder="Enter Topic of Quiz Here"
              onChange={handleChange}
              required
            />
          </div>

          <div className='inputlbl'>
            <label htmlFor='noOfQues'>Number of Question in Quiz</label>
            <input
              name="noOfQues"
              type='number'
              placeholder="Enter Number of Question"
              onChange={questionNo}
              required
            />
          </div>

          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>

      <div><h3>{topic ? `Topic for Quiz is ${topic}` : ''}</h3></div>

    </div>
  );
}

export default QuizCreate;