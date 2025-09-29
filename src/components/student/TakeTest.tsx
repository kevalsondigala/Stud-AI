import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Send } from 'lucide-react';

interface Question {
  id: string;
  type: 'mcq' | 'subjective';
  question: string;
  options?: string[];
  correctAnswer?: string;
  marks: number;
}

const mockQuestions: Question[] = [
  {
    id: '1',
    type: 'mcq',
    question: 'What is the derivative of x² with respect to x?',
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
    question: 'Explain the concept of photosynthesis and its importance in the ecosystem.',
    marks: 10
  },
  {
    id: '4',
    type: 'subjective',
    question: 'Solve the quadratic equation: 2x² - 7x + 3 = 0',
    marks: 5
  }
];

export default function TakeTest() {
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes
  const [testCompleted, setTestCompleted] = useState(false);

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
  };

  const getScore = () => {
    let totalMarks = 0;
    let obtainedMarks = 0;

    mockQuestions.forEach(question => {
      totalMarks += question.marks;
      if (question.type === 'mcq' && answers[question.id] === question.correctAnswer) {
        obtainedMarks += question.marks;
      } else if (question.type === 'subjective' && answers[question.id]) {
        // Mock scoring for subjective questions
        obtainedMarks += Math.floor(question.marks * 0.8); // 80% for demo
      }
    });

    return { obtainedMarks, totalMarks };
  };

  if (testCompleted) {
    const { obtainedMarks, totalMarks } = getScore();
    const percentage = Math.round((obtainedMarks / totalMarks) * 100);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Completed!</h1>
          <p className="text-gray-600">Great job! Here are your results:</p>
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <p className="text-3xl font-bold text-blue-600">{obtainedMarks}</p>
              <p className="text-gray-600">Marks Obtained</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900">{totalMarks}</p>
              <p className="text-gray-600">Total Marks</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-green-600">{percentage}%</p>
              <p className="text-gray-600">Percentage</p>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div 
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <button
            onClick={() => {
              setTestCompleted(false);
              setTestStarted(false);
              setAnswers({});
              setCurrentQuestion(0);
              setTimeLeft(3600);
            }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Take Another Test
          </button>
        </div>
      </div>
    );
  }

  if (!testStarted) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Mathematics Practice Test</h1>
          <p className="text-gray-600">AI-generated test based on your uploaded question papers</p>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Test Instructions</h2>
          <div className="space-y-3 text-gray-600 mb-6">
            <p>• Total Questions: {mockQuestions.length}</p>
            <p>• Duration: 60 minutes</p>
            <p>• Total Marks: {mockQuestions.reduce((sum, q) => sum + q.marks, 0)}</p>
            <p>• MCQ Questions: {mockQuestions.filter(q => q.type === 'mcq').length}</p>
            <p>• Subjective Questions: {mockQuestions.filter(q => q.type === 'subjective').length}</p>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Important Notes:</h3>
                <ul className="text-sm text-yellow-700 mt-1 list-disc list-inside">
                  <li>The test will auto-submit when time expires</li>
                  <li>Make sure you have a stable internet connection</li>
                  <li>You cannot pause the test once started</li>
                </ul>
              </div>
            </div>
          </div>
          <button
            onClick={() => setTestStarted(true)}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Start Test
          </button>
        </div>
      </div>
    );
  }

  const question = mockQuestions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Mathematics Practice Test</h1>
            <p className="text-gray-600">Question {currentQuestion + 1} of {mockQuestions.length}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-red-600">
              <Clock className="h-5 w-5" />
              <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / mockQuestions.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full">
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
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span className="text-gray-900">{option}</span>
              </label>
            ))}
          </div>
        ) : (
          <textarea
            value={answers[question.id] || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
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
        
        {currentQuestion === mockQuestions.length - 1 ? (
          <button
            onClick={handleSubmitTest}
            className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Send className="h-4 w-4" />
            <span>Submit Test</span>
          </button>
        ) : (
          <button
            onClick={() => setCurrentQuestion(Math.min(mockQuestions.length - 1, currentQuestion + 1))}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}