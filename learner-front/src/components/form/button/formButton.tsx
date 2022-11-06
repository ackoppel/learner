import React from 'react';
import './formButton.css';

interface IProps {
  text: string;
  type: 'button' | 'submit';
  onClick?: () => void;
  size: 'large';
}

export const FormButton: React.FC<IProps> = ({ text, type, onClick, size }) => {
  return (
    <button type={type} onClick={onClick} className={`button-${size}`}>
      {text}
    </button>
  );
};
