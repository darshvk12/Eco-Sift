
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { ArrowRight, Upload, BarChart, Award, MapPin } from 'lucide-react';
import FileUpload from '@/components/common/FileUpload';
import Badge from '@/components/common/Badge';

const Home = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleAnalysis = () => {
    if (!file) {
      toast.error('Please upload an image first');
      return;
    }

    // Normally, we would send the file to the server for analysis
    // For demo, we're simulating this process
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Analyzing your waste image...',
        success: () => {
          // Navigate to results page after "analysis"
          navigate('/results', { 
            state: { 
              imageUrl: URL.createObjectURL(file),
              wasteType: 'plastic', // This would come from the AI analysis
            } 
          });
          return 'Analysis complete!';
        },
        error: 'Failed to analyze image',
      }
    );
  };

  const features = [
    {
      icon: <Upload className="h-6 w-6 text-eco-green" />,
      title: 'Instant Waste Classification',
      description: 'Upload a photo and our AI will identify the waste type in seconds.',
      badge: 'AI-Powered'
    },
    {
      icon: <BarChart className="h-6 w-6 text-eco-blue" />,
      title: 'Track Your Impact',
      description: 'Monitor your recycling habits and see your environmental contribution.',
      badge: 'Analytics'
    },
    {
      icon: <Award className="h-6 w-6 text-eco-yellow-dark" />,
      title: 'Gamified Experience',
      description: 'Earn points, badges, and climb the leaderboard while saving the planet.',
      badge: 'Gamification'
    },
    {
      icon: <MapPin className="h-6 w-6 text-eco-red" />,
      title: 'Find Recycling Centers',
      description: 'Locate the nearest recycling facilities using our integrated map.',
      badge: 'Location-Based'
    },
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-eco-green/5 to-eco-blue/5">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-eco-green/10 rounded-full blur-3xl"></div>
          <div className="absolute top-60 -left-20 w-60 h-60 bg-eco-blue/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-10 animate-fade-in">
            <Badge 
              label="AI-Powered Waste Management" 
              variant="success" 
              size="lg" 
              className="mb-6" 
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-eco-neutral-900 dark:text-white mb-6">
              Smart Recycling with
              <span className="text-eco-green block">EcoSift AI</span>
            </h1>
            <p className="text-xl text-eco-neutral-600 dark:text-eco-neutral-300 mb-8">
              Upload a photo of your waste and let our AI classify it instantly.
              Get personalized recycling tips and track your environmental impact.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="eco-button-primary"
              >
                Upload & Classify
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <a
                href="#features"
                className="eco-button-outline"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Hero Image */}
          <div className="max-w-5xl mx-auto rounded-xl overflow-hidden shadow-2xl animate-scale-up">
            <img 
              src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
              alt="Eco-friendly waste management" 
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="py-16 bg-white dark:bg-eco-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <Badge 
                label="Image Classification" 
                variant="info" 
                size="lg" 
                className="mb-4" 
              />
              <h2 className="text-3xl md:text-4xl font-bold text-eco-neutral-900 dark:text-white mb-4">
                Upload Your Waste Image
              </h2>
              <p className="text-eco-neutral-600 dark:text-eco-neutral-300 max-w-2xl mx-auto">
                Our AI will analyze your image and classify the waste type. You'll receive instant feedback and recycling recommendations.
              </p>
            </div>

            <div className="glass-card rounded-2xl overflow-hidden">
              <div className="p-6 md:p-8">
                <FileUpload
                  onFileSelect={handleFileSelect}
                  maxSize={10}
                  className="mb-6"
                />
                
                <div className="flex justify-center">
                  <button
                    onClick={handleAnalysis}
                    disabled={!file}
                    className={`eco-button-primary w-full sm:w-auto ${!file ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    Upload & Analyze
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-eco-neutral-50 dark:bg-eco-neutral-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge 
              label="Key Features" 
              variant="default" 
              size="lg" 
              className="mb-4" 
            />
            <h2 className="text-3xl md:text-4xl font-bold text-eco-neutral-900 dark:text-white mb-4">
              How EcoSift Works
            </h2>
            <p className="text-eco-neutral-600 dark:text-eco-neutral-300 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with a user-friendly interface to make recycling easy and engaging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="glass-card p-6 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 rounded-lg bg-white dark:bg-eco-neutral-700 shadow-sm flex items-center justify-center">
                      {feature.icon}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <h3 className="text-xl font-semibold text-eco-neutral-900 dark:text-white mr-2">
                        {feature.title}
                      </h3>
                      <Badge label={feature.badge} variant="info" size="sm" />
                    </div>
                    <p className="text-eco-neutral-600 dark:text-eco-neutral-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-eco-green to-eco-blue-dark text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Recycling Journey?
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Join thousands of users making a difference in waste management. Sign up today and become part of the solution.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href="/auth"
                className="eco-button bg-white text-eco-green hover:bg-eco-neutral-100 focus:ring-white"
              >
                Create Account
              </a>
              <button
                onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="eco-button bg-transparent border border-white hover:bg-white/10 focus:ring-white"
              >
                Try Without Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
