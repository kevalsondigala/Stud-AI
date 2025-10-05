import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StudentHome from '../components/student/StudentHome';
import UploadPapers from '../components/student/UploadPapers';
import TakeTest from '../components/student/TakeTest';
import Results from '../components/student/Results';
import ProjectHelper from '../components/student/ProjectHelper';
import MyFiles from '../components/student/MyFiles';
import SubscriptionPage from './SubscriptionPage';
import Chatbot from '../components/Chatbot';
import { useAuth } from '../contexts/AuthContext';
import { MessageCircle } from 'lucide-react';

const studentMenuItems = [
  { id: 'home', label: 'Home', icon: 'home', path: '/student' },
  { id: 'upload', label: 'Upload Papers', icon: 'upload', path: '/student/upload' },
  { id: 'test', label: 'Take Test', icon: 'test', path: '/student/test' },
  { id: 'results', label: 'Results', icon: 'results', path: '/student/results' },
  { id: 'projects', label: 'Project Helper', icon: 'lightbulb', path: '/student/projects' },
  { id: 'files', label: 'My Files', icon: 'folder', path: '/student/files' },
  { id: 'subscription', label: 'Subscription', icon: 'crown', path: '/student/subscription' }
];

export default function StudentDashboard() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 flex">
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
            <Route path="/projects" element={<ProjectHelper />} />
            <Route path="/files" element={<MyFiles />} />
            <Route path="/subscription" element={<SubscriptionPage />} />
          </Routes>
        </div>
        
        {/* Floating Chatbot Button */}
        <button
          onClick={() => setChatbotOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 z-40"
        >
          <MessageCircle className="h-6 w-6 mx-auto" />
        </button>
        
        <Chatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
      </div>
    </div>
  );
}