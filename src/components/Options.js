import React from 'react';

function Options({ options, selectedOption, onOptionChange, isMultiple }) {
  return (
    <div>
      {options.map((option, index) => (
        <div className='option'>
          <label key={index}>
            <input
              type={isMultiple ? 'checkbox' : 'radio'}
              value={option}
              checked={isMultiple ? selectedOption.includes(option) : selectedOption[0] === option}
              onChange={onOptionChange}
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
}

export default Options;
