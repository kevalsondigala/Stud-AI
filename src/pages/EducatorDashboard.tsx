import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import EducatorHome from '../components/educator/EducatorHome';
import GeneratePapers from '../components/educator/GeneratePapers';
import QuestionBank from '../components/educator/QuestionBank';
import Analytics from '../components/educator/Analytics';
import { useAuth } from '../contexts/AuthContext';

const educatorMenuItems = [
  { id: 'home', label: 'Home', icon: 'home', path: '/educator' },
  { id: 'generate', label: 'Generate Papers', icon: 'generate', path: '/educator/generate' },
  { id: 'question-bank', label: 'Question Bank', icon: 'bank', path: '/educator/question-bank' },
  { id: 'analytics', label: 'Analytics', icon: 'analytics', path: '/educator/analytics' }
];

export default function EducatorDashboard() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar
        menuItems={educatorMenuItems}
        collapsed={sidebarCollapsed}
        onCollapse={setSidebarCollapsed}
        user={user}
      />
      
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <div className="p-6">
          <Routes>
            <Route path="/" element={<EducatorHome />} />
            <Route path="/generate" element={<GeneratePapers />} />
            <Route path="/question-bank" element={<QuestionBank />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}