import React, { useState } from 'react';
import { BarChart3, TrendingUp, Trophy, Calendar, Download, Eye } from 'lucide-react';

interface TestResult {
  id: string;
  testName: string;
  subject: string;
  date: string;
  score: number;
  totalMarks: number;
  percentage: number;
  duration: string;
  questionsAttempted: number;
  totalQuestions: number;
}

const mockResults: TestResult[] = [
  {
    id: '1',
    testName: 'Mathematics Mock Test #1',
    subject: 'Mathematics',
    date: '2024-01-15',
    score: 85,
    totalMarks: 100,
    percentage: 85,
    duration: '45:30',
    questionsAttempted: 18,
    totalQuestions: 20
  },
  {
    id: '2',
    testName: 'Physics Practice Set',
    subject: 'Physics',
    date: '2024-01-12',
    score: 92,
    totalMarks: 100,
    percentage: 92,
    duration: '52:15',
    questionsAttempted: 20,
    totalQuestions: 20
  },
  {
    id: '3',
    testName: 'Chemistry Quiz',
    subject: 'Chemistry',
    date: '2024-01-10',
    score: 78,
    totalMarks: 100,
    percentage: 78,
    duration: '38:45',
    questionsAttempted: 16,
    totalQuestions: 20
  },
  {
    id: '4',
    testName: 'Mathematics Advanced',
    subject: 'Mathematics',
    date: '2024-01-08',
    score: 95,
    totalMarks: 100,
    percentage: 95,
    duration: '55:20',
    questionsAttempted: 20,
    totalQuestions: 20
  }
];

export default function Results() {
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  
  const subjects = ['all', ...Array.from(new Set(mockResults.map(r => r.subject)))];
  const filteredResults = selectedSubject === 'all' 
    ? mockResults 
    : mockResults.filter(r => r.subject === selectedSubject);

  const averageScore = Math.round(
    filteredResults.reduce((sum, result) => sum + result.percentage, 0) / filteredResults.length
  );

  const totalTests = filteredResults.length;
  const highestScore = Math.max(...filteredResults.map(r => r.percentage));

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return 'text-green-600 bg-green-50';
    if (percentage >= 75) return 'text-blue-600 bg-blue-50';
    if (percentage >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Test Results</h1>
          <p className="text-gray-600">Track your performance and identify areas for improvement</p>
        </div>
        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {subjects.map(subject => (
            <option key={subject} value={subject}>
              {subject === 'all' ? 'All Subjects' : subject}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Tests</p>
              <p className="text-2xl font-bold text-gray-900">{totalTests}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Score</p>
              <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
            </div>
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Highest Score</p>
              <p className="text-2xl font-bold text-gray-900">{highestScore}%</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Trophy className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Improvement</p>
              <p className="text-2xl font-bold text-green-600">+12%</p>
            </div>
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Test Results</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredResults.map((result) => (
                <tr key={result.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{result.testName}</div>
                      <div className="text-sm text-gray-500">{result.subject}</div>
                      <div className="text-xs text-gray-400">
                        {result.questionsAttempted}/{result.totalQuestions} questions attempted
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {result.score}/{result.totalMarks}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(result.percentage)}`}>
                      {result.percentage}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {result.duration}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                      {new Date(result.date).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-800 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-800 transition-colors">
                        <Download className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h2>
        <div className="h-64 flex items-end space-x-4">
          {filteredResults.slice(-8).map((result, index) => (
            <div key={result.id} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t-lg transition-all duration-500 hover:bg-blue-600"
                style={{ height: `${(result.percentage / 100) * 200}px` }}
              ></div>
              <div className="mt-2 text-xs text-gray-500 text-center">
                <div>{result.subject.slice(0, 3)}</div>
                <div>{new Date(result.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Strengths</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Consistent performance in Mathematics</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Strong time management skills</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">High completion rate on tests</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Areas for Improvement</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Focus more on Chemistry topics</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Review subjective question techniques</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-600">Practice more timed tests</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}