import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'educator';
  avatar?: string;
  onboardingComplete?: boolean;
  profile?: {
    class: string;
    age: number;
    subjects: string[];
    division?: string;
    rollNo?: string;
  };
  lastWeeklyTest?: string;
  weeklyTestStreak?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: 'student' | 'educator') => Promise<void>;
  signup: (email: string, password: string, name: string, role: 'student' | 'educator') => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  completeOnboarding: (profile: any, hasUploadedFiles: boolean) => void;
  completeWeeklyTest: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('studai_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, role: 'student' | 'educator') => {
    // Mock authentication - replace with actual API calls
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name: email.split('@')[0],
      role,
      avatar: `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2`
    };
    
    setUser(mockUser);
    localStorage.setItem('studai_user', JSON.stringify(mockUser));
  };

  const signup = async (email: string, password: string, name: string, role: 'student' | 'educator') => {
    // Mock signup - replace with actual API calls
    const mockUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role,
      avatar: `https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2`
    };
    
    setUser(mockUser);
    localStorage.setItem('studai_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('studai_user');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('studai_user', JSON.stringify(updatedUser));
    }
  };

  const completeOnboarding = (profile: any, hasUploadedFiles: boolean) => {
    if (user && hasUploadedFiles) {
      const updatedUser = { 
        ...user, 
        onboardingComplete: true, 
        profile 
      };
      setUser(updatedUser);
      localStorage.setItem('studai_user', JSON.stringify(updatedUser));
    }
  };

  const completeWeeklyTest = () => {
    if (user) {
      const today = new Date().toISOString().split('T')[0];
      const currentStreak = user.weeklyTestStreak || 0;
      const updatedUser = { 
        ...user, 
        lastWeeklyTest: today,
        weeklyTestStreak: currentStreak + 1
      };
      setUser(updatedUser);
      localStorage.setItem('studai_user', JSON.stringify(updatedUser));
    }
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    updateUser,
    completeOnboarding,
    completeWeeklyTest
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}