import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import OnboardingPage from './pages/OnboardingPage';
import WeeklyTestPage from './pages/WeeklyTestPage';
import StudentDashboard from './pages/StudentDashboard';
import EducatorDashboard from './pages/EducatorDashboard';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Loader2 } from 'lucide-react';

function App() {
  const [showLanding, setShowLanding] = useState(true);

  const handleGetStarted = () => {
    setShowLanding(false);
  };

  if (showLanding) {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  // Apply theme on user change
  useEffect(() => {
    if (user?.theme) {
      document.documentElement.classList.toggle('dark', user.theme === 'dark');
    }
  }, [user?.theme]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading stud.ai...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthPage />;
  }

  // Check if student needs onboarding
  if (user.role === 'student' && !user.onboardingComplete) {
    return <OnboardingPage />;
  }

  // Check if student needs weekly test
  if (user.role === 'student' && needsWeeklyTest(user)) {
    return <WeeklyTestPage />;
  }

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          user.role === 'student' ? 
          <Navigate to="/student" replace /> : 
          <Navigate to="/educator" replace />
        } 
      />
      <Route path="/student/*" element={<StudentDashboard />} />
      <Route path="/educator/*" element={<EducatorDashboard />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function needsWeeklyTest(user: any): boolean {
  if (!user.lastWeeklyTest) return true;
  
  const lastTest = new Date(user.lastWeeklyTest);
  const today = new Date();
  const daysDiff = Math.floor((today.getTime() - lastTest.getTime()) / (1000 * 60 * 60 * 24));
  
  return daysDiff >= 7;
}

export default App;