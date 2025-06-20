// src/app/context/DrawingContext.js
import React, {
  createContext,
  useContext,
  useState,
} from 'react';

const DrawingContext = createContext();

export const useDrawingContext = () => useContext(DrawingContext);

export const DrawingProvider = ({ children }) => {
  const [activeTool, setActiveTool] = useState('select');
  const [shapes, setShapes] = useState([]);
  const [selectedShape, setSelectedShape] = useState(null);
  const [showAnnotations, setShowAnnotations] = useState(true);
  const [currentProject, setCurrentProject] = useState(null);
  const [projects, setProjects] = useState([]);
  
  const addShape = (shape) => {
    setShapes([...shapes, shape]);
  };
  
  const updateShape = (id, updates) => {
    setShapes(shapes.map(shape => 
      shape.id === id ? { ...shape, ...updates } : shape
    ));
  };
  
  const deleteShape = (id) => {
    setShapes(shapes.filter(shape => shape.id !== id));
    if (selectedShape?.id === id) setSelectedShape(null);
  };
  
  const contextValue = {
    activeTool,
    setActiveTool,
    shapes,
    addShape,
    updateShape,
    deleteShape,
    selectedShape,
    setSelectedShape,
    showAnnotations,
    setShowAnnotations,
    currentProject,
    setCurrentProject,
    projects,
    setProjects
  };
  
  return (
    <DrawingContext.Provider value={contextValue}>
      {children}
    </DrawingContext.Provider>
  );
};