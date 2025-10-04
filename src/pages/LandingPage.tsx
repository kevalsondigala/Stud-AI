import React, { useEffect, useState } from 'react';
import { 
  Brain, 
  BookOpen, 
  Zap, 
  Users, 
  Upload, 
  FileText, 
  MessageCircle, 
  Lightbulb,
  BarChart3,
  Clock,
  CheckCircle,
  ArrowRight,
  Star,
  Target,
  Sparkles
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: MessageCircle,
      title: 'AI Chatbot',
      description: 'Get instant help with doubts and answer checking',
      color: 'bg-blue-500'
    },
    {
      icon: Lightbulb,
      title: 'Project Helper',
      description: 'Plan and build school projects with AI guidance',
      color: 'bg-purple-500'
    },
    {
      icon: Zap,
      title: 'Weekly Surprise Tests',
      description: 'Stay exam-ready with personalized weekly assessments',
      color: 'bg-orange-500'
    },
    {
      icon: FileText,
      title: 'Knowledge Hub',
      description: 'Your personal study cloud with smart organization',
      color: 'bg-green-500'
    }
  ];

  const steps = [
    {
      icon: Upload,
      title: 'Upload Your Notes & Textbooks',
      description: 'Just drag and drop your study materials'
    },
    {
      icon: Brain,
      title: 'Let AI Generate Your Tests',
      description: 'Practice with smart papers based on your syllabus'
    },
    {
      icon: Clock,
      title: 'Get Weekly Surprise Tests',
      description: 'Stay exam-ready every week'
    },
    {
      icon: BarChart3,
      title: 'Learn, Revise, and Track Progress',
      description: 'AI insights to help you improve every time'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Class 12 Student',
      content: 'Stud.ai helped me improve my test scores by 25%. The AI-generated questions are spot-on!',
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      name: 'Dr. Rajesh Kumar',
      role: 'Mathematics Teacher',
      content: 'Creating question papers is now effortless. My students love the personalized practice tests.',
      avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    },
    {
      name: 'Arjun Patel',
      role: 'Engineering Student',
      content: 'The project helper feature saved me hours of research. Highly recommend for all students!',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2'
    }
  ];

  const FloatingIcon = ({ icon: Icon, className, delay = 0 }: { icon: any, className: string, delay?: number }) => (
    <div 
      className={`absolute ${className} opacity-20 animate-float`}
      style={{ 
        animationDelay: `${delay}s`,
        animationDuration: '6s',
        animationIterationCount: 'infinite'
      }}
    >
      <Icon className="h-8 w-8 text-indigo-400" />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-sky-50">
        {/* Floating Icons */}
        <FloatingIcon icon={BookOpen} className="top-20 left-20" delay={0} />
        <FloatingIcon icon={Brain} className="top-32 right-32" delay={1} />
        <FloatingIcon icon={Lightbulb} className="bottom-40 left-16" delay={2} />
        <FloatingIcon icon={Target} className="top-40 left-1/3" delay={3} />
        <FloatingIcon icon={Sparkles} className="bottom-32 right-20" delay={4} />
        <FloatingIcon icon={FileText} className="top-60 right-16" delay={5} />

        <div className={`text-center max-w-4xl mx-auto px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-600 rounded-3xl mb-8 shadow-lg">
            <Brain className="h-10 w-10 text-white" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your AI Study Companion for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-sky-500">
              Smarter Learning
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Generate question papers, take surprise tests, and get personalized AI help — all in one place.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="group bg-indigo-600 text-white px-8 py-4 rounded-2xl hover:bg-indigo-700 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-indigo-600 px-8 py-4 rounded-2xl border-2 border-indigo-200 hover:bg-indigo-50 transition-all duration-300 font-semibold text-lg">
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with AI-powered learning in just four simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110">
                    <step.icon className="h-10 w-10 text-indigo-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Preview Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for effective exam preparation and learning
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-sky-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of students and educators who are already learning smarter
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-sky-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <FloatingIcon icon={Sparkles} className="top-10 left-10 opacity-30" delay={0} />
        <FloatingIcon icon={Target} className="bottom-10 right-10 opacity-30" delay={2} />
        <FloatingIcon icon={Lightbulb} className="top-20 right-20 opacity-30" delay={4} />
        
        <div className="relative max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Start Your Smarter Study Journey Today
          </h2>
          <p className="text-xl md:text-2xl text-indigo-100 mb-12 max-w-2xl mx-auto">
            Join thousands of students and educators who are already learning more effectively with AI
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={onGetStarted}
              className="group bg-white text-indigo-600 px-8 py-4 rounded-2xl hover:bg-gray-50 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
            >
              <span>Sign Up Free</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="text-white px-8 py-4 rounded-2xl border-2 border-white border-opacity-30 hover:bg-white hover:bg-opacity-10 transition-all duration-300 font-semibold text-lg">
              Learn More
            </button>
          </div>
          
          <div className="mt-12 flex items-center justify-center space-x-8 text-indigo-100">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Free to start</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5" />
              <span>Setup in 2 minutes</span>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(5deg); }
          66% { transform: translateY(-10px) rotate(-5deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}