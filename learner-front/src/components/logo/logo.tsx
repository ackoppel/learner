import React from 'react';
import './logo.css';

interface IProps {
  showText?: boolean;
}

export const Logo: React.FC<IProps> = ({ showText }) => {
  return (
    <div className='logo'>
      <h1>Learner</h1>
      {showText && <p>Learn about your portfolio</p>}
    </div>
  );
};
