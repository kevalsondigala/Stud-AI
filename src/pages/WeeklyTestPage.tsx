import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Clock, Zap, CheckCircle, AlertCircle } from 'lucide-react';

interface Question {
  id: string;
  type: 'mcq' | 'subjective';
  question: string;
  options?: string[];
  correctAnswer?: string;
  marks: number;
}

const generateWeeklyTest = (userProfile: any): Question[] => {
  // Mock AI-generated questions based on user profile
  const questions: Question[] = [
    {
      id: '1',
      type: 'mcq',
      question: `Based on your ${userProfile?.subjects?.[0] || 'Mathematics'} studies, what is the derivative of x²?`,
      options: ['2x', 'x²', '2', 'x'],
      correctAnswer: '2x',
      marks: 2
    },
    {
      id: '2',
      type: 'mcq',
      question: 'Which of the following is a prime number?',
      options: ['15', '17', '21', '25'],
      correctAnswer: '17',
      marks: 2
    },
    {
      id: '3',
      type: 'subjective',
      question: `Explain a key concept from your recent ${userProfile?.subjects?.[1] || 'Physics'} notes.`,
      marks: 6
    }
  ];

  return questions;
};

export default function WeeklyTestPage() {
  const { user, completeWeeklyTest } = useAuth();
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes
  const [testCompleted, setTestCompleted] = useState(false);
  const [questions] = useState(() => generateWeeklyTest(user?.profile));

  useEffect(() => {
    if (testStarted && !testCompleted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleSubmitTest();
    }
  }, [testStarted, testCompleted, timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmitTest = () => {
    setTestCompleted(true);
    setTestStarted(false);
    completeWeeklyTest();
  };

  const getScore = () => {
    let totalMarks = 0;
    let obtainedMarks = 0;

    questions.forEach(question => {
      totalMarks += question.marks;
      if (question.type === 'mcq' && answers[question.id] === question.correctAnswer) {
        obtainedMarks += question.marks;
      } else if (question.type === 'subjective' && answers[question.id]) {
        // Mock scoring for subjective questions
        obtainedMarks += Math.floor(question.marks * 0.8);
      }
    });

    return { obtainedMarks, totalMarks };
  };

  if (testCompleted) {
    const { obtainedMarks, totalMarks } = getScore();
    const percentage = Math.round((obtainedMarks / totalMarks) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Weekly Test Complete!</h1>
            <p className="text-gray-600 mb-6">Great job completing your surprise test!</p>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-blue-600">{obtainedMarks}</p>
                  <p className="text-sm text-gray-600">Score</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{totalMarks}</p>
                  <p className="text-sm text-gray-600">Total</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-600">{percentage}%</p>
                  <p className="text-sm text-gray-600">Percentage</p>
                </div>
              </div>
            </div>

            {user?.weeklyTestStreak && user.weeklyTestStreak > 1 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center space-x-2">
                  <Zap className="h-5 w-5 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                    {user.weeklyTestStreak} week streak! 🔥
                  </span>
                </div>
              </div>
            )}

            <button
              onClick={() => window.location.reload()}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Continue to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-600 rounded-2xl mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Weekly Surprise Test!</h1>
              <p className="text-gray-600">Time for your weekly knowledge check</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Questions</span>
                <span className="font-medium text-gray-900">{questions.length}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Time Limit</span>
                <span className="font-medium text-gray-900">15 minutes</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-600">Total Marks</span>
                <span className="font-medium text-gray-900">
                  {questions.reduce((sum, q) => sum + q.marks, 0)}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-start space-x-2">
                <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-blue-900">Important:</h3>
                  <p className="text-sm text-blue-700 mt-1">
                    Complete this test to access your dashboard. Questions are based on your uploaded materials.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setTestStarted(true)}
              className="w-full bg-purple-600 text-white py-3 px-4 rounded-xl hover:bg-purple-700 transition-colors font-medium"
            >
              Start Weekly Test
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl p-4 border border-gray-200 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Weekly Surprise Test</h1>
              <p className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            <div className="flex items-center space-x-2 text-purple-600">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-3 py-1 rounded-full">
                {question.type === 'mcq' ? 'Multiple Choice' : 'Subjective'}
              </span>
              <span className="text-sm text-gray-600">Marks: {question.marks}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{question.question}</h2>
          </div>

          {question.type === 'mcq' && question.options ? (
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <label
                  key={index}
                  className="flex items-center space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    checked={answers[question.id] === option}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    className="text-purple-600 focus:ring-purple-500"
                  />
                  <span className="text-gray-900">{option}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              placeholder="Type your answer here..."
            />
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmitTest}
              className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Submit Test</span>
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}