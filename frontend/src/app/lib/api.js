// src/app/lib/api.js
const API_URL = 'http://localhost:5000/api';

export const createProject = async (name) => {
  const response = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });
  return response.json();
};

export const getProjects = async () => {
  const response = await fetch(`${API_URL}/projects`);
  return response.json();
};

export const saveShapes = async (projectId, shapes) => {
  // Send multiple shapes in one request
  const response = await fetch(`${API_URL}/shapes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      projectId,
      shapes: shapes.map(shape => ({
        type: shape.type,
        properties: shape.properties
      }))
    })
  });
  return response.json();
};

export const loadShapes = async (projectId) => {
  const response = await fetch(`${API_URL}/shapes/${projectId}`);
  return response.json();
};

export const saveAnnotation = async (shapeId, text, position) => {
  await fetch(`${API_URL}/annotations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ shapeId, text, position })
  });
};