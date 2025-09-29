import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Upload, 
  FileText, 
  BarChart3, 
  Trophy, 
  Clock, 
  Target,
  TrendingUp,
  Calendar
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function StudentHome() {
  const { user } = useAuth();

  const recentActivities = [
    { id: 1, type: 'test', title: 'Mathematics Mock Test', score: 85, date: '2 hours ago' },
    { id: 2, type: 'upload', title: 'Physics Question Papers', count: 5, date: '1 day ago' },
    { id: 3, type: 'test', title: 'Chemistry Practice Set', score: 92, date: '3 days ago' },
  ];

  const stats = [
    { label: 'Tests Taken', value: '12', icon: FileText, color: 'bg-blue-500' },
    { label: 'Average Score', value: '88%', icon: Target, color: 'bg-green-500' },
    { label: 'Time Saved', value: '24h', icon: Clock, color: 'bg-purple-500' },
    { label: 'Papers Uploaded', value: '8', icon: Upload, color: 'bg-orange-500' },
  ];

  const quickActions = [
    {
      title: 'Upload Question Papers',
      description: 'Upload your old question papers to generate new practice tests',
      icon: Upload,
      link: '/student/upload',
      color: 'bg-blue-500'
    },
    {
      title: 'Take Practice Test',
      description: 'Start a new AI-generated test based on your uploaded papers',
      icon: FileText,
      link: '/student/test',
      color: 'bg-green-500'
    },
    {
      title: 'View Results',
      description: 'Check your performance and track your progress',
      icon: BarChart3,
      link: '/student/results',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-blue-100 text-lg">
          Ready to ace your exams? Let's get started with AI-powered practice.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quickActions.map((action, index) => (
          <Link
            key={index}
            to={action.link}
            className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 group"
          >
            <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <action.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
            <p className="text-gray-600">{action.description}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'test' ? 'bg-green-100' : 'bg-blue-100'
                }`}>
                  {activity.type === 'test' ? (
                    <Trophy className={`h-5 w-5 ${activity.type === 'test' ? 'text-green-600' : 'text-blue-600'}`} />
                  ) : (
                    <Upload className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    {activity.type === 'test' && activity.score && (
                      <span className="text-green-600 font-medium mr-2">Score: {activity.score}%</span>
                    )}
                    {activity.type === 'upload' && activity.count && (
                      <span className="text-blue-600 font-medium mr-2">{activity.count} files</span>
                    )}
                    <span>{activity.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Chart */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Performance Trend</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">This Week</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">85%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Last Week</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">78%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">2 Weeks Ago</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">92%</span>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-800">+7% improvement this week!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}