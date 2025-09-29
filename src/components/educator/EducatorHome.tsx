import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Database, 
  BarChart3, 
  Users, 
  FileText, 
  Upload,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function EducatorHome() {
  const { user } = useAuth();

  const stats = [
    { label: 'Question Papers Generated', value: '24', icon: FileText, color: 'bg-blue-500' },
    { label: 'Students Served', value: '156', icon: Users, color: 'bg-green-500' },
    { label: 'Question Bank Size', value: '842', icon: Database, color: 'bg-purple-500' },
    { label: 'Avg. Generation Time', value: '45s', icon: Clock, color: 'bg-orange-500' },
  ];

  const recentActivity = [
    { id: 1, action: 'Generated Mathematics Paper Set A', time: '2 hours ago', type: 'generate' },
    { id: 2, action: 'Added 25 questions to Physics bank', time: '1 day ago', type: 'bank' },
    { id: 3, action: 'Exported Chemistry Question Paper', time: '2 days ago', type: 'export' },
  ];

  const quickActions = [
    {
      title: 'Generate Question Papers',
      description: 'Create new question papers using AI from your uploaded content',
      icon: Zap,
      link: '/educator/generate',
      color: 'bg-blue-500'
    },
    {
      title: 'Manage Question Bank',
      description: 'View and organize your auto-generated question database',
      icon: Database,
      link: '/educator/question-bank',
      color: 'bg-green-500'
    },
    {
      title: 'View Analytics',
      description: 'Track usage statistics and performance metrics',
      icon: BarChart3,
      link: '/educator/analytics',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}! 👨‍🏫
        </h1>
        <p className="text-purple-100 text-lg">
          Streamline your question paper creation with AI-powered tools.
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
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'generate' ? 'bg-blue-100' : 
                  activity.type === 'bank' ? 'bg-green-100' : 'bg-purple-100'
                }`}>
                  {activity.type === 'generate' ? (
                    <Zap className="h-5 w-5 text-blue-600" />
                  ) : activity.type === 'bank' ? (
                    <Database className="h-5 w-5 text-green-600" />
                  ) : (
                    <Upload className="h-5 w-5 text-purple-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Usage Statistics */}
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Usage This Month</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Papers Generated</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">24/32</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Questions Created</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">842/1000</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Storage Used</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-sm font-medium text-gray-900">2.3/5 GB</span>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">25% more productive this month!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}