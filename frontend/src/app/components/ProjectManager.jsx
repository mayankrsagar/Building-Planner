// src/app/components/ProjectManager.js
import React, {
  useEffect,
  useState,
} from 'react';

import { useDrawingContext } from '../context/DrawingContext';
import {
  createProject,
  getProjects,
  loadShapes,
  saveShapes,
} from '../lib/api';

const ProjectManager = () => {
  const { 
    shapes, 
    currentProject, 
    setCurrentProject, 
    projects, 
    setProjects 
  } = useDrawingContext();
  
  const [newProjectName, setNewProjectName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Added state declaration
  
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setIsLoading(true); // Now properly declared
        const data = await getProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjects();
  }, []);
  
  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    
    try {
      const project = await createProject(newProjectName);
      setProjects([...projects, project]);
      setCurrentProject(project);
      setNewProjectName('');
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };
  
  const handleSelectProject = (project) => {
    setCurrentProject(project);
  };
  
  const handleSaveProject = async () => {
    if (!currentProject) return;
    
    setIsSaving(true);
    try {
      await saveShapes(currentProject._id, shapes);
      setIsSaving(false);
      alert('Project saved successfully!');
    } catch (error) {
      console.error('Error saving project:', error);
      setIsSaving(false);
    }
  };
  
  const handleLoadProject = async () => {
    if (!currentProject) return;
    
    try {
      const loadedShapes = await loadShapes(currentProject._id);
      // Update context with loaded shapes
      // (This would be implemented in the context)
      console.log('Loaded shapes:', loadedShapes);
      alert('Project loaded successfully!');
    } catch (error) {
      console.error('Error loading project:', error);
    }
  };
  
  return (
    <div className="p-4 bg-gray-100 border-t">
      <div className="flex items-center space-x-4">
        <div className="flex-1">
          <div className="flex space-x-2">
            <input
              type="text"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              placeholder="New project name"
              className="border rounded px-3 py-2 w-64"
            />
            <button
              onClick={handleCreateProject}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Create
            </button>
          </div>
          
          <div className="mt-2 flex space-x-2">
            <select
              value={currentProject?._id || ''}
              onChange={(e) => handleSelectProject(
                projects.find(p => p._id === e.target.value)
              )}
              className="border rounded px-3 py-2 w-64"
            >
              <option value="">Select a project</option>
              {projects.map(project => (
                <option key={project._id} value={project._id}>
                  {project.name}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleSaveProject}
              disabled={!currentProject || isSaving}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            
            <button
              onClick={handleLoadProject}
              disabled={!currentProject}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:bg-gray-400"
            >
              Load
            </button>
          </div>
        </div>
        
        {currentProject && (
          <div className="text-sm">
            <p className="font-semibold">{currentProject.name}</p>
            <p className="text-gray-600">
              Created: {new Date(currentProject.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectManager;