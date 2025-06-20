'use client';

import dynamic from 'next/dynamic';

import ProjectManager from './components/ProjectManager';
import ShapeProperties from './components/ShapeProperties';
import Toolbar from './components/ToolBar';
import { DrawingProvider } from './context/DrawingContext';

// Dynamically import to avoid server-side rendering
const DrawingCanvas = dynamic(() => import('./components/DrawingCanvas'), {
  ssr: false,
  loading: () => <div className="flex-1 bg-gray-100 flex items-center justify-center">Loading canvas...</div>
});

export default function Home() {
  return (
    <DrawingProvider>
      <div className="flex flex-col h-screen">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-bold text-gray-800">Building Planner</h1>
          </div>
        </header>
        
        <Toolbar />
        
        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1">
            <DrawingCanvas />
          </div>
          <ShapeProperties />
        </div>
        
        <ProjectManager />
      </div>
    </DrawingProvider>
  );
}