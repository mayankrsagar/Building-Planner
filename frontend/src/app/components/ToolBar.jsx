// src/app/components/Toolbar.js
import React from 'react';

import { useDrawingContext } from '../context/DrawingContext';

const Toolbar = () => {
  const { activeTool, setActiveTool, setShowAnnotations, showAnnotations } = useDrawingContext();
  
  const tools = [
    { id: 'select', name: 'Select', icon: '/icons/select.svg' },
    { id: 'line', name: 'Line', icon: '/icons/line.svg' },
    { id: 'rectangle', name: 'Rectangle', icon: '/icons/rectangle.svg' },
    { id: 'circle', name: 'Circle', icon: '/icons/circle.svg' },
    { id: 'view', name: 'View Annotations', icon: '/icons/view.svg' }
  ];
  
  const handleToolClick = (toolId) => {
    if (toolId === 'view') {
      setShowAnnotations(!showAnnotations);
    } else {
      setActiveTool(toolId);
    }
  };
  
  return (
    <div className="bg-gray-100 p-4 flex items-center border-b">
      <div className="flex space-x-2">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => handleToolClick(tool.id)}
            className={`p-3 rounded-lg flex flex-col items-center ${
              (activeTool === tool.id || 
              (tool.id === 'view' && showAnnotations)) 
                ? 'bg-blue-100 border-blue-500 border' 
                : 'bg-white hover:bg-gray-50'
            }`}
            style={{ minWidth: '80px' }}
          >
            <img src={tool.icon} alt={tool.name} className="w-6 h-6 mb-1" />
            <span className="text-xs">{tool.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Toolbar;