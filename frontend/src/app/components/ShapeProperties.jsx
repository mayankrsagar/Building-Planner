// src/app/components/ShapeProperties.js
import React, {
  useEffect,
  useState,
} from 'react';

import { useDrawingContext } from '../context/DrawingContext';

const ShapeProperties = () => {
  const { selectedShape, updateShape, deleteShape } = useDrawingContext();
  const [properties, setProperties] = useState({});
  
  useEffect(() => {
    if (selectedShape) {
      setProperties({ ...selectedShape.properties });
    } else {
      setProperties({});
    }
  }, [selectedShape]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperties(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
  };
  
  const handleSave = () => {
    if (selectedShape) {
      updateShape(selectedShape.id, properties);
    }
  };
  
  const handleDelete = () => {
    if (selectedShape) {
      deleteShape(selectedShape.id);
    }
  };

  // Moved inside the component to access state and functions
  const renderProperties = () => {
    if (!selectedShape) return null;

    switch (selectedShape.type) {
      case 'line':
        return (
          <>
            <div className="flex items-center">
              <label className="w-24 text-sm">x1:</label>
              <input
                type="number"
                name="x1"
                value={properties.x1 || 0}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-24"
              />
            </div>
            <div className="flex items-center">
              <label className="w-24 text-sm">y1:</label>
              <input
                type="number"
                name="y1"
                value={properties.y1 || 0}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-24"
              />
            </div>
            <div className="flex items-center">
              <label className="w-24 text-sm">x2:</label>
              <input
                type="number"
                name="x2"
                value={properties.x2 || 0}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-24"
              />
            </div>
            <div className="flex items-center">
              <label className="w-24 text-sm">y2:</label>
              <input
                type="number"
                name="y2"
                value={properties.y2 || 0}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-24"
              />
            </div>
          </>
        );
        
      case 'rectangle':
        return (
          <>
            <div className="flex items-center">
              <label className="w-24 text-sm">x:</label>
              <input
                type="number"
                name="x"
                value={properties.x || 0}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-24"
              />
            </div>
            <div className="flex items-center">
              <label className="w-24 text-sm">y:</label>
              <input
                type="number"
                name="y"
                value={properties.y || 0}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-24"
              />
            </div>
            <div className="flex items-center">
              <label className="w-24 text-sm">width:</label>
              <input
                type="number"
                name="width"
                value={properties.width || 0}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-24"
              />
            </div>
            <div className="flex items-center">
              <label className="w-24 text-sm">height:</label>
              <input
                type="number"
                name="height"
                value={properties.height || 0}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-24"
              />
            </div>
          </>
        );
        
      case 'circle':
        return (
          <>
            <div className="flex items-center">
              <label className="w-24 text-sm">x:</label>
              <input
                type="number"
                name="x"
                value={properties.x || 0}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-24"
              />
            </div>
            <div className="flex items-center">
              <label className="w-24 text-sm">y:</label>
              <input
                type="number"
                name="y"
                value={properties.y || 0}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-24"
              />
            </div>
            <div className="flex items-center">
              <label className="w-24 text-sm">radius:</label>
              <input
                type="number"
                name="radius"
                value={properties.radius || 0}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm w-24"
              />
            </div>
          </>
        );
        
      default:
        return null;
    }
  };
  
  if (!selectedShape) {
    return (
      <div className="p-4 bg-gray-50 border-l">
        <div className="text-gray-500 text-center py-8">
          Select a shape to view properties
        </div>
      </div>
    );
  }
  
  return (
    <div className="p-4 bg-gray-50 border-l w-80">
      <h3 className="font-semibold mb-4 capitalize">{selectedShape.type} Properties</h3>
      
      <div className="space-y-3">
        {renderProperties()}
      </div>
      
      <div className="mt-6 flex space-x-2">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ShapeProperties;