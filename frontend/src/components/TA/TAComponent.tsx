import React from 'react';

interface TAComponentProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

const TAComponent: React.FC<TAComponentProps> = ({ title, description, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        {icon && <span className="text-3xl mr-3">{icon}</span>}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default TAComponent;