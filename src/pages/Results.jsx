import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Info, Trash2, DownloadCloud, Share2, FileText, Leaf, Recycle } from 'lucide-react';
import Badge from '@/components/common/Badge';
import { toast } from 'sonner';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [confidence, setConfidence] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Get data from location state or use defaults
  const imageUrl = location.state?.imageUrl || null;
  const wasteTypeId = location.state?.wasteType || 'plastic'; // Default to plastic if not provided

  useEffect(() => {
    if (!imageUrl) {
      navigate('/');
      toast.error('No image to analyze. Please upload one first.');
    }

    // Check if user is authenticated
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!user);

    // Simulate loading and confidence animation
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    const confidenceTimer = setInterval(() => {
      setConfidence(prev => {
        if (prev >= 95) {
          clearInterval(confidenceTimer);
          return 95;
        }
        return prev + 5;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(confidenceTimer);
    };
  }, [imageUrl, navigate]);

  // Waste type database
  const wasteTypes = {
    plastic: {
      type: 'Plastic',
      category: 'recyclable',
      icon: <Recycle />,
      color: 'eco-yellow',
      description: 'This item appears to be a plastic container. Most plastic containers with recycling codes 1 (PET) and 2 (HDPE) are widely recyclable.',
      tips: [
        'Rinse the container before recycling to remove food residue',
        'Remove any non-plastic parts like caps or labels if possible',
        'Check the recycling code (1-7) to confirm local recyclability',
        'Flatten to save space in recycling bins',
      ],
      alternatives: [
        'Glass containers',
        'Stainless steel or silicone food storage',
        'Beeswax wraps instead of plastic wrap',
        'Reusable shopping bags',
      ],
    },
    paper: {
      type: 'Paper',
      category: 'recyclable',
      icon: <FileText />,
      color: 'eco-blue',
      description: 'This item appears to be paper-based. Most clean, dry paper products can be recycled, though some with food contamination should be composted instead.',
      tips: [
        'Keep paper dry and clean',
        'Remove any plastic windows, tape, or non-paper materials',
        'Flatten cardboard boxes to save space',
        'Compost heavily soiled paper rather than recycling it',
      ],
      alternatives: [
        'Digital documentation',
        'Reusable cloth napkins',
        'Bamboo paper products',
        'Recycled paper products',
      ],
    },
    organic: {
      type: 'Organic Waste',
      category: 'compostable',
      icon: <Leaf />,
      color: 'eco-green',
      description: 'This item appears to be organic waste. Organic materials like food scraps and yard waste can be composted to create nutrient-rich soil.',
      tips: [
        'Compost in a designated bin or community composting program',
        'Mix "green" materials (food waste) with "brown" materials (leaves, paper)',
        'Keep meat, dairy, and oils out of home compost bins',
        'Use compost to enrich garden soil',
      ],
      alternatives: [
        'Meal planning to reduce food waste',
        'Freezing leftovers',
        'Regrow vegetable scraps',
        'Donate excess food to community programs',
      ],
    },
    glass: {
      type: 'Glass',
      category: 'recyclable',
      icon: <Recycle />,
      color: 'eco-blue',
      description: 'This item appears to be glass. Glass containers are 100% recyclable and can be recycled endlessly without loss in quality or purity.',
      tips: [
        'Rinse containers to remove food residue',
        'Remove lids and caps (recycle separately if metal)',
        'Sort by color if required by local recycling program',
        'Do not include window glass, mirrors, or ceramics in container glass recycling',
      ],
      alternatives: [
        'Reuse glass jars for storage',
        'Choose returnable bottle systems where available',
        'Use glass containers for leftover food storage',
      ],
    },
    metal: {
      type: 'Metal',
      category: 'recyclable',
      icon: <Recycle />,
      color: 'eco-blue',
      description: 'This item appears to be metal. Most metal items like aluminum cans and steel containers are highly recyclable and valuable in the recycling stream.',
      tips: [
        'Rinse containers to remove food residue',
        'Crush aluminum cans to save space',
        'Remove paper labels when possible',
        'Check if your local program accepts aerosol cans',
      ],
      alternatives: [
        'Reusable stainless steel containers',
        'Refillable water bottles',
        'Choosing products with less packaging',
      ],
    },
    electronic: {
      type: 'Electronic Waste',
      category: 'non-recyclable',
      icon: <Trash2 />,
      color: 'eco-red',
      description: 'This item appears to be electronic waste (e-waste). E-waste contains valuable materials but also hazardous components that require special handling.',
      tips: [
        'Never put electronics in regular trash or recycling',
        'Use designated e-waste collection sites or events',
        'Delete personal data before disposing of devices',
        'Some retailers offer take-back programs for electronics',
      ],
      alternatives: [
        'Repair instead of replace when possible',
        'Donate working electronics',
        'Buy refurbished electronics',
        'Choose products with longer lifespans',
      ],
    },
  };

  const wasteType = wasteTypes[wasteTypeId];
  
  const handleSaveResults = () => {
    if (!isAuthenticated) {
      toast.error('Please sign in to save results');
      return;
    }
    
    toast.success('Result saved to your dashboard');
  };
  
  const categoryColors = {
    'compostable': 'bg-eco-green/10 border-eco-green/20 text-eco-green',
    'recyclable': 'bg-eco-yellow/10 border-eco-yellow/20 text-eco-yellow-dark',
    'non-recyclable': 'bg-eco-red/10 border-eco-red/20 text-eco-red',
  };
  
  const categoryLabels = {
    'compostable': 'Compostable',
    'recyclable': 'Recyclable',
    'non-recyclable': 'Non-Recyclable',
  };

  if (!wasteType) return null;

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-eco-neutral-50 to-white dark:from-eco-neutral-900 dark:to-eco-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/')}
              className="group flex items-center text-eco-neutral-600 hover:text-eco-green transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              <span>Back to Upload</span>
            </button>
          </div>

          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-eco-neutral-900 dark:text-white mb-2">
              Waste Analysis Results
            </h1>
            <p className="text-eco-neutral-600 dark:text-eco-neutral-400">
              Our AI has analyzed your image and classified the waste type
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Image and classification */}
            <div className="lg:col-span-2">
              <div className="glass-card rounded-xl overflow-hidden animate-scale-up">
                <div className="relative">
                  {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-eco-neutral-900/80 backdrop-blur-sm z-10">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 border-4 border-eco-green border-t-transparent rounded-full animate-spin"></div>
                        <p className="mt-3 font-medium text-eco-neutral-700 dark:text-eco-neutral-300">Analyzing image...</p>
                      </div>
                    </div>
                  ) : (
                    <div className={`absolute top-3 left-3 z-10 ${categoryColors[wasteType.category]} px-3 py-1.5 rounded-full border font-medium text-sm flex items-center space-x-1 shadow-md`}>
                      {wasteType.icon}
                      <span>{categoryLabels[wasteType.category]}</span>
                    </div>
                  )}
                  
                  <img 
                    src={imageUrl} 
                    alt="Uploaded waste image" 
                    className="w-full aspect-square object-cover" 
                  />
                </div>
                
                <div className="p-5 border-t border-eco-neutral-200 dark:border-eco-neutral-700">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-xl font-semibold text-eco-neutral-900 dark:text-white">
                      {wasteType.type}
                    </h3>
                    <span className="text-sm font-medium text-eco-neutral-500">
                      Confidence: {confidence}%
                    </span>
                  </div>
                  
                  <div className="w-full h-2 bg-eco-neutral-200 dark:bg-eco-neutral-700 rounded-full mt-1 mb-4">
                    <div 
                      className={`h-full rounded-full bg-${wasteType.color}`}
                      style={{ width: `${confidence}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between mt-4">
                    <button
                      onClick={() => toast.success('Image downloaded')}
                      className="p-2 text-eco-neutral-600 dark:text-eco-neutral-400 hover:text-eco-green transition-colors"
                      aria-label="Download"
                    >
                      <DownloadCloud className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => toast.success('Link copied to clipboard')}
                      className="p-2 text-eco-neutral-600 dark:text-eco-neutral-400 hover:text-eco-green transition-colors"
                      aria-label="Share"
                    >
                      <Share2 className="h-5 w-5" />
                    </button>
                    <button
                      onClick={handleSaveResults}
                      className="px-3 py-1 bg-eco-green text-white rounded-md hover:bg-eco-green-dark transition-colors text-sm font-medium"
                    >
                      Save Result
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Analysis details */}
            <div className="lg:col-span-3">
              <div className="glass-card rounded-xl overflow-hidden animate-slide-up">
                <div className="p-6">
                  <div className="flex items-start mb-4">
                    <div className={`p-2 rounded-lg bg-${wasteType.color}/10 mr-4`}>
                      {wasteType.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-eco-neutral-900 dark:text-white mb-2">
                        {wasteType.type} Analysis
                      </h2>
                      <p className="text-eco-neutral-600 dark:text-eco-neutral-400">
                        {wasteType.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-eco-neutral-100 dark:bg-eco-neutral-800 rounded-lg p-4 mb-6">
                    <div className="flex items-center mb-2">
                      <Info className="h-5 w-5 text-eco-blue mr-2" />
                      <h3 className="font-medium text-eco-neutral-800 dark:text-white">
                        Recycling Tips
                      </h3>
                    </div>
                    <ul className="space-y-2 text-eco-neutral-700 dark:text-eco-neutral-300">
                      {wasteType.tips.map((tip, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-4 h-4 rounded-full bg-eco-green flex-shrink-0 mt-1 mr-2"></span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-eco-neutral-800 dark:text-white mb-3 flex items-center">
                      <Leaf className="h-5 w-5 text-eco-green mr-2" />
                      Eco-Friendly Alternatives
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {wasteType.alternatives.map((alt, index) => (
                        <div 
                          key={index}
                          className="bg-eco-green/5 border border-eco-green/10 rounded-lg p-3 text-eco-neutral-800 dark:text-eco-neutral-200"
                        >
                          {alt}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-5 border-t border-eco-neutral-200 dark:border-eco-neutral-700">
                    <div className="flex flex-wrap justify-between items-center">
                      <Badge 
                        label={wasteType.category === 'compostable' ? 'Low Environmental Impact' : wasteType.category === 'recyclable' ? 'Medium Environmental Impact' : 'High Environmental Impact'} 
                        variant={wasteType.category === 'compostable' ? 'success' : wasteType.category === 'recyclable' ? 'warning' : 'danger'}
                        size="md"
                      />
                      
                      {!isAuthenticated && (
                        <div className="mt-4 sm:mt-0 text-sm text-eco-neutral-600 dark:text-eco-neutral-400">
                          <a href="/auth" className="text-eco-green hover:text-eco-green-dark font-medium">
                            Sign in
                          </a>
                          {' '}to track your recycling progress
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 glass-card rounded-xl overflow-hidden animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="p-6">
                  <h3 className="font-medium text-eco-neutral-800 dark:text-white mb-4">
                    Local Recycling Information
                  </h3>
                  <p className="text-eco-neutral-600 dark:text-eco-neutral-400 mb-4">
                    Based on common regulations, here's how to properly dispose of this type of waste in your area:
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:space-x-4">
                    <a 
                      href="/recycling-map" 
                      className="eco-button-primary mb-3 sm:mb-0 flex-1 justify-center"
                    >
                      Find Nearby Recycling Centers
                    </a>
                    <button 
                      onClick={() => toast.success('Detailed information downloaded')}
                      className="eco-button-outline flex-1 justify-center"
                    >
                      Download Detailed Guide
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
