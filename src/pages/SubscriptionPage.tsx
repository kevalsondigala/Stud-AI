import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Check, Crown, Zap, Star, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PricingPlan {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  period: string;
  description: string;
  features: string[];
  popular?: boolean;
  buttonText: string;
  buttonColor: string;
}

export default function SubscriptionPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const isStudent = user?.role === 'student';

  const studentPlans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Perfect for getting started with AI-powered learning',
      features: [
        '5 AI-generated tests per month',
        'Basic chatbot support',
        'Upload up to 10 files',
        'Weekly surprise tests',
        'Basic progress tracking'
      ],
      buttonText: 'Current Plan',
      buttonColor: 'bg-gray-600'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 199,
      originalPrice: 299,
      period: 'month',
      description: 'Ideal for serious students who want unlimited practice',
      features: [
        'Unlimited AI-generated tests',
        'Advanced AI chatbot with subject expertise',
        'Upload unlimited files',
        'Daily surprise tests',
        'Detailed performance analytics',
        'Project helper with AI guidance',
        'Priority support',
        'Export test results'
      ],
      popular: true,
      buttonText: 'Upgrade to Pro',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'max',
      name: 'Max',
      price: 799,
      originalPrice: 999,
      period: 'month',
      description: 'Complete learning solution with premium features',
      features: [
        'Everything in Pro',
        'Personalized study plans',
        'Advanced AI tutor (1-on-1 sessions)',
        'Custom question paper generation',
        'Collaborative study groups',
        'Offline mode support',
        'Advanced analytics & insights',
        'Priority customer support',
        'Early access to new features'
      ],
      buttonText: 'Upgrade to Max',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const educatorPlans: PricingPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      period: 'forever',
      description: 'Basic tools for individual educators',
      features: [
        '10 question papers per month',
        'Basic question bank (up to 100 questions)',
        'Simple analytics',
        'Email support',
        'Basic AI assistance'
      ],
      buttonText: 'Current Plan',
      buttonColor: 'bg-gray-600'
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 799,
      originalPrice: 1199,
      period: 'month',
      description: 'Professional tools for serious educators',
      features: [
        'Unlimited question papers',
        'Advanced question bank (unlimited)',
        'Detailed student analytics',
        'Bulk question generation',
        'Custom paper templates',
        'Advanced AI assistance',
        'Priority support',
        'Integration with LMS'
      ],
      popular: true,
      buttonText: 'Upgrade to Pro',
      buttonColor: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      id: 'max',
      name: 'Max',
      price: 1899,
      originalPrice: 2499,
      period: 'month',
      description: 'Complete solution for institutions and advanced educators',
      features: [
        'Everything in Pro',
        'Multi-user collaboration',
        'Advanced student tracking',
        'Custom branding',
        'API access',
        'White-label solution',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced reporting & insights'
      ],
      buttonText: 'Upgrade to Max',
      buttonColor: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  const plans = isStudent ? studentPlans : educatorPlans;

  const handlePlanSelect = async (planId: string) => {
    if (planId === 'free') return;
    
    setSelectedPlan(planId);
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      alert(`Successfully upgraded to ${plans.find(p => p.id === planId)?.name} plan!`);
      navigate(isStudent ? '/student' : '/educator');
    }, 2000);
  };

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'free':
        return <Star className="h-6 w-6" />;
      case 'pro':
        return <Zap className="h-6 w-6" />;
      case 'max':
        return <Crown className="h-6 w-6" />;
      default:
        return <Star className="h-6 w-6" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {isStudent 
              ? "Unlock your learning potential with AI-powered study tools"
              : "Streamline your teaching with advanced question generation tools"
            }
          </p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            <span className="mr-2">🎉</span>
            Limited time offer - Save up to 33%!
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                plan.popular 
                  ? 'border-blue-500 scale-105' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="p-8">
                {/* Plan Header */}
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                    plan.id === 'free' ? 'bg-gray-100 text-gray-600' :
                    plan.id === 'pro' ? 'bg-blue-100 text-blue-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {getPlanIcon(plan.name)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                </div>

                {/* Pricing */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="text-4xl font-bold text-gray-900">
                      ₹{plan.price}
                    </span>
                    {plan.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{plan.originalPrice}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-1">
                    {plan.price === 0 ? plan.period : `per ${plan.period}`}
                  </p>
                  {plan.originalPrice && (
                    <div className="mt-2 inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                      Save ₹{plan.originalPrice - plan.price}
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={loading && selectedPlan === plan.id}
                  className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                    plan.id === 'free'
                      ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                      : `${plan.buttonColor} text-white hover:scale-105 active:scale-95`
                  }`}
                >
                  {loading && selectedPlan === plan.id ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    plan.buttonText
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Can I change my plan anytime?</h3>
              <p className="text-gray-600 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Is there a free trial?</h3>
              <p className="text-gray-600 text-sm">Our Free plan gives you access to core features. You can upgrade anytime to unlock premium features.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600 text-sm">We accept all major credit cards, debit cards, UPI, and net banking for Indian users.</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600 text-sm">Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service.</p>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 text-center">
          <div className="flex items-center justify-center space-x-8 text-gray-500">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">30-day money back</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">Secure payments</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-sm">Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}