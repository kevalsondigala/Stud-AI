import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import EducatorHome from '../components/educator/EducatorHome';
import GeneratePapers from '../components/educator/GeneratePapers';
import QuestionBank from '../components/educator/QuestionBank';
import Analytics from '../components/educator/Analytics';
import SubscriptionPage from './SubscriptionPage';
import Chatbot from '../components/Chatbot';
import { useAuth } from '../contexts/AuthContext';
import { MessageCircle } from 'lucide-react';

const educatorMenuItems = [
  { id: 'home', label: 'Home', icon: 'home', path: '/educator' },
  { id: 'generate', label: 'Generate Papers', icon: 'generate', path: '/educator/generate' },
  { id: 'question-bank', label: 'Question Bank', icon: 'bank', path: '/educator/question-bank' },
  { id: 'analytics', label: 'Analytics', icon: 'analytics', path: '/educator/analytics' },
  { id: 'subscription', label: 'Subscription', icon: 'crown', path: '/educator/subscription' }
];

export default function EducatorDashboard() {
  const { user } = useAuth();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);

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
            <Route path="/subscription" element={<SubscriptionPage />} />
          </Routes>
        </div>
        
        {/* Floating Chatbot Button */}
        <button
          onClick={() => setChatbotOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all duration-300 hover:scale-110 z-40"
        >
          <MessageCircle className="h-6 w-6 mx-auto" />
        </button>
        
        <Chatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
      </div>
    </div>
  );
}