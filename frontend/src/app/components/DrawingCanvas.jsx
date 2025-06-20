// src/app/components/DrawingCanvas.js
import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import { useDrawingContext } from '../context/DrawingContext';

const DrawingCanvas = () => {
  const {
    activeTool,
    shapes,
    addShape,
    selectedShape,
    setSelectedShape,
    showAnnotations,
    updateShape
  } = useDrawingContext();
  
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

  // Handle window resize and set initial dimensions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateDimensions = () => {
        setDimensions({
          width: window.innerWidth - 300,
          height: window.innerHeight - 150
        });
      };
      
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  // Draw shapes on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    shapes.forEach(shape => {
      ctx.strokeStyle = shape.id === selectedShape?.id ? 'blue' : 'black';
      ctx.lineWidth = 2;
      ctx.font = '12px Arial';
      ctx.fillStyle = 'black';
      
      switch (shape.type) {
        case 'line':
          ctx.beginPath();
          ctx.moveTo(shape.properties.x1, shape.properties.y1);
          ctx.lineTo(shape.properties.x2, shape.properties.y2);
          ctx.stroke();
          if (showAnnotations) {
            const length = Math.sqrt(
              Math.pow(shape.properties.x2 - shape.properties.x1, 2) + 
              Math.pow(shape.properties.y2 - shape.properties.y1, 2)
            ).toFixed(1);
            ctx.fillText(`${length}px`, 
              (shape.properties.x1 + shape.properties.x2) / 2,
              (shape.properties.y1 + shape.properties.y2) / 2
            );
          }
          break;
          
        case 'rectangle':
          ctx.strokeRect(
            shape.properties.x, 
            shape.properties.y, 
            shape.properties.width, 
            shape.properties.height
          );
          if (showAnnotations) {
            ctx.fillText(`W: ${shape.properties.width}px`, 
              shape.properties.x + shape.properties.width / 2 - 20,
              shape.properties.y - 10
            );
            ctx.fillText(`H: ${shape.properties.height}px`, 
              shape.properties.x - 40,
              shape.properties.y + shape.properties.height / 2
            );
          }
          break;
          
        case 'circle':
          ctx.beginPath();
          ctx.arc(
            shape.properties.x, 
            shape.properties.y, 
            shape.properties.radius, 
            0, 
            Math.PI * 2
          );
          ctx.stroke();
          if (showAnnotations) {
            ctx.fillText(`R: ${shape.properties.radius}px`, 
              shape.properties.x + shape.properties.radius + 5,
              shape.properties.y
            );
          }
          break;
          
        default:
          break;
      }
    });
  }, [shapes, selectedShape, showAnnotations, dimensions]);

  // Define event handlers
  const handleMouseDown = (e) => {
    if (activeTool === 'select') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setIsDrawing(true);
    setStartPoint({ x, y });
    
    const newShape = {
      id: Date.now().toString(),
      type: activeTool,
      properties: {}
    };
    
    switch (activeTool) {
      case 'line':
        newShape.properties = { x1: x, y1: y, x2: x, y2: y };
        break;
      case 'rectangle':
        newShape.properties = { x, y, width: 0, height: 0 };
        break;
      case 'circle':
        newShape.properties = { x, y, radius: 0 };
        break;
      default:
        break;
    }
    
    addShape(newShape);
    setSelectedShape(newShape);
  };
  
  const handleMouseMove = (e) => {
    if (!isDrawing || !selectedShape) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const updatedShape = { ...selectedShape };
    
    switch (selectedShape.type) {
      case 'line':
        updatedShape.properties = { 
          ...selectedShape.properties, 
          x2: x, 
          y2: y 
        };
        break;
      case 'rectangle':
        updatedShape.properties = { 
          ...selectedShape.properties, 
          width: x - selectedShape.properties.x,
          height: y - selectedShape.properties.y
        };
        break;
      case 'circle':
        const radius = Math.sqrt(
          Math.pow(x - selectedShape.properties.x, 2) + 
          Math.pow(y - selectedShape.properties.y, 2)
        );
        updatedShape.properties = { 
          ...selectedShape.properties, 
          radius 
        };
        break;
      default:
        break;
    }
    
    updateShape(selectedShape.id, updatedShape.properties);
  };
  
  const handleMouseUp = () => {
    setIsDrawing(false);
  };
  
  const handleCanvasClick = (e) => {
    if (activeTool !== 'select') return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Find clicked shape
    const clickedShape = shapes.find(shape => {
      switch (shape.type) {
        case 'line':
          // Line collision detection
          const dx = shape.properties.x2 - shape.properties.x1;
          const dy = shape.properties.y2 - shape.properties.y1;
          const length = Math.sqrt(dx * dx + dy * dy);
          const dot = ((x - shape.properties.x1) * dx + (y - shape.properties.y1) * dy) / (length * length);
          const closestX = shape.properties.x1 + dot * dx;
          const closestY = shape.properties.y1 + dot * dy;
          const distance = Math.sqrt(Math.pow(x - closestX, 2) + Math.pow(y - closestY, 2));
          return distance < 5;
          
        case 'rectangle':
          return x >= shape.properties.x && 
                 x <= shape.properties.x + shape.properties.width &&
                 y >= shape.properties.y && 
                 y <= shape.properties.y + shape.properties.height;
                 
        case 'circle':
          const distanceFromCenter = Math.sqrt(
            Math.pow(x - shape.properties.x, 2) + 
            Math.pow(y - shape.properties.y, 2)
          );
          return distanceFromCenter <= shape.properties.radius;
          
        default:
          return false;
      }
    });
    
    setSelectedShape(clickedShape || null);
  };

  return (
    <div className="flex-1 relative">
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={handleCanvasClick}
        className="border border-gray-300 bg-white"
        style={{ cursor: activeTool === 'select' ? 'default' : 'crosshair' }}
      />
    </div>
  );
};

export default DrawingCanvas;