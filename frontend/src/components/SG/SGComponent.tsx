import React from 'react';

interface SGComponentProps {
  title: string;
  details: string;
}

const SGComponent: React.FC<SGComponentProps> = ({ title, details }) => {
  return (
    <div className="bg-gray-100 shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{details}</p>
    </div>
  );
};

export default SGComponent;