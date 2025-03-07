import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../App.css"

function Home({ inputValue, setInputValue }) {
    const navigate = useNavigate();
    const [quizExists, setQuizExists] = useState(true);

    const handleChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
        const quizData = localStorage.getItem(value);
        setQuizExists(quizData !== null && quizData !== '');
    };

    const handleSubmit = () => {
        if (quizExists) { navigate('/quiz'); }
        else { alert("Enter Correct Link!") }
    }

    return (
        <div>
            <div>
                <h1>Hii!! Welcome to React Quiz Builder App</h1>
            </div>
            <div className='container'>
                <div>
                    Ready to create Quiz -
                    <a href='/quizCreate' className='clk-lnk'>Create</a>
                </div>
                <h4>OR</h4>
                <div className='inputlbl'>
                    Have a link to attempt
                    <input
                        name='quizlink'
                        value={inputValue}
                        onChange={handleChange}
                        placeholder='Enter Your link here'
                    />
                </div>
                <button type='submit' onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
}

export default Home;