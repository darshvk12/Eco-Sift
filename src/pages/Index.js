
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Upload, Leaf, Recycle } from 'lucide-react';
import FileUpload from '../components/common/FileUpload.jsx';
import { toast } from 'sonner';

const Index = () => {
  const handleFileSelect = (file) => {
    // Create object URL for the image preview
    const imageUrl = URL.createObjectURL(file);
    
    // In a real app, you would upload the file to a server here
    console.log("File selected:", file);
    
    // Mock successful analysis
    setTimeout(() => {
      // Navigate to results page with the image data
      window.location.href = '/results';
      
      // Store data in localStorage (as a simple way to pass data between pages)
      localStorage.setItem('ecosift_last_image', imageUrl);
      localStorage.setItem('ecosift_last_waste_type', 'plastic');
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-white dark:bg-eco-neutral-900">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-eco-neutral-900 dark:text-white mb-6">
                Identify Waste <span className="text-eco-green">Instantly</span> with AI
              </h1>
              <p className="text-lg text-eco-neutral-600 dark:text-eco-neutral-300 mb-8">
                Take a photo of any item and our AI will tell you whether it's recyclable, compostable, or trash - and how to dispose of it properly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#upload-section" className="eco-button-primary flex items-center justify-center gap-2">
                  <Upload size={18} />
                  <span>Upload Image</span>
                </a>
                <Link to="/recycling-map" className="eco-button-outline flex items-center justify-center gap-2">
                  <Recycle size={18} />
                  <span>Find Recycling Centers</span>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 mt-12 md:mt-0">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-eco-green/10 rounded-full"></div>
                <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-eco-yellow/10 rounded-full"></div>
                <img 
                  src="/images/hero-waste-sorting.jpg" 
                  alt="AI Waste Identification" 
                  className="rounded-xl shadow-xl relative z-10 object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-eco-neutral-50 dark:bg-eco-neutral-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-eco-neutral-900 dark:text-white mb-4">How EcoSift Works</h2>
            <p className="text-eco-neutral-600 dark:text-eco-neutral-300 max-w-2xl mx-auto">
              Our AI-powered waste identification system makes recycling easier than ever before
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white dark:bg-eco-neutral-700 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center mb-4">
                <Upload className="h-6 w-6 text-eco-green" />
              </div>
              <h3 className="text-xl font-semibold text-eco-neutral-900 dark:text-white mb-2">Upload a Photo</h3>
              <p className="text-eco-neutral-600 dark:text-eco-neutral-300">
                Take a picture or upload an image of the item you want to identify
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-white dark:bg-eco-neutral-700 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center mb-4">
                <div className="h-6 w-6 text-eco-green">🔍</div>
              </div>
              <h3 className="text-xl font-semibold text-eco-neutral-900 dark:text-white mb-2">AI Analysis</h3>
              <p className="text-eco-neutral-600 dark:text-eco-neutral-300">
                Our advanced AI identifies the material and classifies the waste type
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-white dark:bg-eco-neutral-700 rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-eco-green/10 flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-eco-green" />
              </div>
              <h3 className="text-xl font-semibold text-eco-neutral-900 dark:text-white mb-2">Get Guidance</h3>
              <p className="text-eco-neutral-600 dark:text-eco-neutral-300">
                Receive clear instructions on how to properly dispose or recycle the item
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload-section" className="py-16 bg-white dark:bg-eco-neutral-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-eco-neutral-900 dark:text-white mb-4">Identify Your Waste</h2>
            <p className="text-eco-neutral-600 dark:text-eco-neutral-300 max-w-2xl mx-auto">
              Upload a photo of an item and our AI will tell you how to dispose of it properly
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <FileUpload 
              onFileSelect={handleFileSelect}
              accept="image/*"
              maxSize={10}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-eco-green/5 dark:bg-eco-neutral-800 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-eco-neutral-900 dark:text-white mb-4">Benefits of Proper Waste Sorting</h2>
            <p className="text-eco-neutral-600 dark:text-eco-neutral-300 max-w-2xl mx-auto">
              Making an impact with every item you dispose correctly
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Benefit 1 */}
            <div className="bg-white dark:bg-eco-neutral-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-eco-neutral-900 dark:text-white mb-2">Reduce Landfill Waste</h3>
              <p className="text-eco-neutral-600 dark:text-eco-neutral-300">
                Proper sorting reduces the amount of recyclable materials ending up in landfills
              </p>
            </div>
            
            {/* Benefit 2 */}
            <div className="bg-white dark:bg-eco-neutral-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-eco-neutral-900 dark:text-white mb-2">Save Energy</h3>
              <p className="text-eco-neutral-600 dark:text-eco-neutral-300">
                Recycling uses less energy than producing new materials from raw resources
              </p>
            </div>
            
            {/* Benefit 3 */}
            <div className="bg-white dark:bg-eco-neutral-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-eco-neutral-900 dark:text-white mb-2">Reduce Pollution</h3>
              <p className="text-eco-neutral-600 dark:text-eco-neutral-300">
                Proper waste management helps reduce water and air pollution
              </p>
            </div>
            
            {/* Benefit 4 */}
            <div className="bg-white dark:bg-eco-neutral-700 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-eco-neutral-900 dark:text-white mb-2">Conserve Resources</h3>
              <p className="text-eco-neutral-600 dark:text-eco-neutral-300">
                Recycling conserves valuable natural resources for future generations
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-eco-green dark:bg-eco-green-dark py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Recycling Smarter?</h2>
              <p className="text-white/90 max-w-md mb-6">
                Join thousands of users making a positive environmental impact with EcoSift
              </p>
              <Link to="/auth" className="inline-flex items-center bg-white text-eco-green px-6 py-3 rounded-full font-medium shadow-lg hover:bg-eco-neutral-100 transition-colors">
                Create an Account
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <img 
                src="/images/eco-community.jpg" 
                alt="EcoSift Community" 
                className="rounded-xl shadow-lg max-w-sm"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
