import React, { useState } from 'react';
import { Lightbulb, FileText, Download, Clock, Target, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProjectIdea {
  id: string;
  title: string;
  subject: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  duration: string;
  description: string;
  materials: string[];
  steps: string[];
}

const mockProjectIdeas: ProjectIdea[] = [
  {
    id: '1',
    title: 'Solar System Model with Arduino',
    subject: 'Physics',
    difficulty: 'Medium',
    duration: '2-3 weeks',
    description: 'Create an interactive solar system model using Arduino to demonstrate planetary motion and distances.',
    materials: ['Arduino Uno', 'LED strips', 'Servo motors', 'Cardboard', 'Paint', 'Wires'],
    steps: [
      'Research planetary distances and orbital periods',
      'Design the base structure and planetary positions',
      'Program Arduino for LED patterns and motor control',
      'Assemble the physical model',
      'Test and calibrate the system',
      'Prepare presentation and documentation'
    ]
  },
  {
    id: '2',
    title: 'Mathematical Patterns in Nature',
    subject: 'Mathematics',
    difficulty: 'Easy',
    duration: '1-2 weeks',
    description: 'Explore and document mathematical patterns found in nature like Fibonacci sequences, fractals, and golden ratio.',
    materials: ['Camera', 'Measuring tools', 'Graph paper', 'Calculator', 'Natural specimens'],
    steps: [
      'Collect natural specimens showing patterns',
      'Measure and document mathematical relationships',
      'Create visual representations and graphs',
      'Analyze patterns using mathematical formulas',
      'Compile findings into a comprehensive report',
      'Present discoveries with visual aids'
    ]
  },
  {
    id: '3',
    title: 'Water Quality Analysis Lab',
    subject: 'Chemistry',
    difficulty: 'Hard',
    duration: '3-4 weeks',
    description: 'Conduct comprehensive water quality testing from different sources and analyze chemical composition.',
    materials: ['pH strips', 'Test tubes', 'Chemical indicators', 'Microscope', 'Water samples', 'Lab equipment'],
    steps: [
      'Collect water samples from various sources',
      'Perform pH, dissolved oxygen, and turbidity tests',
      'Test for chemical contaminants and bacteria',
      'Record and analyze all measurements',
      'Compare results with safety standards',
      'Create recommendations and final report'
    ]
  }
];

export default function ProjectHelper() {
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState<ProjectIdea | null>(null);
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const userSubjects = user?.profile?.subjects || ['Mathematics', 'Physics', 'Chemistry'];
  const filteredProjects = mockProjectIdeas.filter(project => 
    userSubjects.includes(project.subject)
  );

  const handleGenerateReport = async (project: ProjectIdea) => {
    setGeneratingReport(true);
    
    // Simulate AI report generation
    setTimeout(() => {
      setGeneratingReport(false);
      setReportGenerated(true);
    }, 3000);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Project Helper</h1>
        <p className="text-gray-600">Get AI-powered project ideas and step-by-step execution plans</p>
      </div>

      {!selectedProject ? (
        <>
          {/* Project Ideas Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-blue-600" />
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                    {project.difficulty}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Target className="h-4 w-4" />
                    <span>{project.subject}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{project.duration}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Generate Custom Project */}
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Need a Custom Project?</h3>
                <p className="text-gray-600 text-sm">Get AI-generated project ideas tailored to your specific requirements and interests.</p>
              </div>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                Generate Ideas
              </button>
            </div>
          </div>
        </>
      ) : (
        /* Project Details */
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSelectedProject(null)}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Projects
            </button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedProject.title}</h1>
                <p className="text-gray-600">{selectedProject.description}</p>
              </div>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedProject.difficulty)}`}>
                {selectedProject.difficulty}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">{selectedProject.subject}</p>
                <p className="text-sm text-gray-600">Subject</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">{selectedProject.duration}</p>
                <p className="text-sm text-gray-600">Duration</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <FileText className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <p className="font-medium text-gray-900">{selectedProject.steps.length} Steps</p>
                <p className="text-sm text-gray-600">Execution Plan</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Materials Needed */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Materials Needed</h3>
                <div className="space-y-2">
                  {selectedProject.materials.map((material, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="text-gray-900">{material}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Execution Steps */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Execution Steps</h3>
                <div className="space-y-3">
                  {selectedProject.steps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-gray-900 flex-1">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Generate Report Section */}
            <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Auto-Generate Project Report</h3>
                  <p className="text-gray-600 text-sm">Get a professionally formatted project report template with all sections pre-filled.</p>
                </div>
                <div className="flex space-x-3">
                  {reportGenerated ? (
                    <>
                      <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Download PDF</span>
                      </button>
                      <button className="flex items-center space-x-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Download Word</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleGenerateReport(selectedProject)}
                      disabled={generatingReport}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                    >
                      {generatingReport ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Generating...</span>
                        </>
                      ) : (
                        <>
                          <FileText className="h-4 w-4" />
                          <span>Generate Report</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}