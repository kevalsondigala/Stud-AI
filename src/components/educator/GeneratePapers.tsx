import React, { useState } from 'react';
import { 
  Upload, 
  Zap, 
  FileText, 
  Download, 
  Settings, 
  Clock,
  CheckCircle,
  Copy
} from 'lucide-react';

interface PaperConfiguration {
  subject: string;
  totalMarks: number;
  duration: number;
  mcqCount: number;
  subjectiveCount: number;
  difficulty: 'easy' | 'medium' | 'hard' | 'mixed';
}

export default function GeneratePapers() {
  const [step, setStep] = useState<'upload' | 'configure' | 'generate' | 'result'>('upload');
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [config, setConfig] = useState<PaperConfiguration>({
    subject: 'Mathematics',
    totalMarks: 100,
    duration: 180,
    mcqCount: 10,
    subjectiveCount: 5,
    difficulty: 'mixed'
  });
  const [generating, setGenerating] = useState(false);
  const [generatedPapers, setGeneratedPapers] = useState<string[]>([]);

  const handleFileUpload = (files: string[]) => {
    setUploadedFiles(files);
    setStep('configure');
  };

  const handleGenerate = async () => {
    setGenerating(true);
    setStep('generate');
    
    // Simulate AI generation
    setTimeout(() => {
      setGeneratedPapers(['Paper Set A', 'Paper Set B']);
      setGenerating(false);
      setStep('result');
    }, 3000);
  };

  const resetProcess = () => {
    setStep('upload');
    setUploadedFiles([]);
    setGeneratedPapers([]);
  };

  if (step === 'upload') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Generate Question Papers</h1>
          <p className="text-gray-600">Upload your source materials to generate AI-powered question papers</p>
        </div>

        <div className="bg-white rounded-xl p-8 border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors text-center">
          <Upload className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Upload Source Materials</h3>
          <p className="text-gray-600 mb-6">Upload previous question papers, syllabi, or textbook content</p>
          <button
            onClick={() => handleFileUpload(['sample-paper-1.pdf', 'syllabus.docx', 'textbook-ch3.pdf'])}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Select Files to Upload
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <FileText className="h-8 w-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Previous Papers</h3>
            <p className="text-sm text-gray-600">Upload old question papers for pattern analysis</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <FileText className="h-8 w-8 text-green-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Syllabus</h3>
            <p className="text-sm text-gray-600">Include syllabus for topic coverage</p>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <FileText className="h-8 w-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-900 mb-2">Study Material</h3>
            <p className="text-sm text-gray-600">Add textbooks and reference materials</p>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'configure') {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Configure Paper Settings</h1>
          <p className="text-gray-600">Customize your question paper parameters</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                <input
                  type="text"
                  value={config.subject}
                  onChange={(e) => setConfig({ ...config, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Total Marks</label>
                <input
                  type="number"
                  value={config.totalMarks}
                  onChange={(e) => setConfig({ ...config, totalMarks: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  value={config.duration}
                  onChange={(e) => setConfig({ ...config, duration: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Question Distribution</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">MCQ Questions</label>
                <input
                  type="number"
                  value={config.mcqCount}
                  onChange={(e) => setConfig({ ...config, mcqCount: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Subjective Questions</label>
                <input
                  type="number"
                  value={config.subjectiveCount}
                  onChange={(e) => setConfig({ ...config, subjectiveCount: parseInt(e.target.value) })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty Level</label>
                <select
                  value={config.difficulty}
                  onChange={(e) => setConfig({ ...config, difficulty: e.target.value as any })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Files</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-500" />
                <span className="text-sm text-gray-900">{file}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between">
          <button
            onClick={() => setStep('upload')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back to Upload
          </button>
          <button
            onClick={handleGenerate}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Zap className="h-4 w-4" />
            <span>Generate Papers</span>
          </button>
        </div>
      </div>
    );
  }

  if (step === 'generate') {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Zap className={`h-8 w-8 text-blue-600 ${generating ? 'animate-pulse' : ''}`} />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Generating Question Papers</h1>
          <p className="text-gray-600">AI is analyzing your content and creating customized question papers...</p>
        </div>

        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Content Analysis Complete</h3>
                <p className="text-sm text-gray-500">Analyzed {uploadedFiles.length} files successfully</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                generating ? 'bg-blue-100 animate-pulse' : 'bg-green-100'
              }`}>
                {generating ? (
                  <Clock className="h-5 w-5 text-blue-600" />
                ) : (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">
                  {generating ? 'Generating Questions...' : 'Question Generation Complete'}
                </h3>
                <p className="text-sm text-gray-500">
                  {generating ? 'Creating questions based on your configuration' : 'Generated multiple paper sets'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                !generating ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                {!generating ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <Clock className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Paper Formatting</h3>
                <p className="text-sm text-gray-500">
                  {!generating ? 'Papers formatted and ready for download' : 'Pending...'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Papers Generated Successfully!</h1>
        <p className="text-gray-600">Your AI-generated question papers are ready for download</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {generatedPapers.map((paper, index) => (
          <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{paper}</h3>
                  <p className="text-sm text-gray-500">{config.subject} • {config.totalMarks} Marks</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <Copy className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2 text-sm text-gray-600 mb-4">
              <p>• Duration: {config.duration} minutes</p>
              <p>• MCQ Questions: {config.mcqCount}</p>
              <p>• Subjective Questions: {config.subjectiveCount}</p>
              <p>• Difficulty: {config.difficulty}</p>
            </div>

            <div className="flex space-x-2">
              <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex-1 justify-center">
                <Download className="h-4 w-4" />
                <span>Download PDF</span>
              </button>
              <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors flex-1 justify-center">
                <Download className="h-4 w-4" />
                <span>Download Word</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center">
        <button
          onClick={resetProcess}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          Generate More Papers
        </button>
      </div>
    </div>
  );
}