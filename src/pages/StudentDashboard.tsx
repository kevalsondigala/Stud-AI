import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StudentHome from '../components/student/StudentHome';
import UploadPapers from '../components/student/UploadPapers';
import TakeTest from '../components/student/TakeTest';
import Results from '../components/student/Results';
import { useAuth } from '../contexts/AuthContext';

const studentMenuItems = [
  { id: 'home', label: 'Home', icon: 'home', path: '/student' },
  { id: 'upload', label: 'Upload Papers', icon: 'upload', path: '/student/upload' },
  { id: 'test', label: 'Take Test', icon: 'test', path: '/student/test' },
  { id: 'results', label: 'Results', icon: 'results', path: '/student/results' }
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        menuItems={studentMenuItems}
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
        user={user}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<StudentHome />} />
            <Route path="/upload" element={<UploadPapers />} />
            <Route path="/test" element={<TakeTest />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}