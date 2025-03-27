
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BarChart3, 
  UploadCloud, 
  Award, 
  Settings, 
  ChevronRight, 
  Calendar, 
  User, 
  Trash2,
  FileText,
  Leaf,
  Recycle,
  BarChart,
} from "lucide-react";
import Badge from "@/components/common/Badge";
import { toast } from "sonner";

// Mock chart data for the dashboard
const mockChartData = [
  { name: "Plastic", value: 42, color: "#FBBC04" },
  { name: "Paper", value: 28, color: "#4285F4" },
  { name: "Glass", value: 15, color: "#34A853" },
  { name: "Metal", value: 10, color: "#EA4335" },
  { name: "Electronic", value: 5, color: "#9B59B6" },
];

type WasteClassificationRecord = {
  id: string;
  date: string;
  wasteType: "plastic" | "paper" | "glass" | "metal" | "organic" | "electronic";
  imageUrl: string;
  points: number;
};

type UserBadge = {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  earnedOn?: string;
  progress?: number;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [recentActivity, setRecentActivity] = useState<WasteClassificationRecord[]>([]);
  const [badges, setBadges] = useState<UserBadge[]>([]);

  useEffect(() => {
    // Check if user is authenticated
    const user = localStorage.getItem("user");
    
    if (!user) {
      toast.error("Please sign in to view your dashboard");
      navigate("/auth");
      return;
    }
    
    setUserData(JSON.parse(user));
    
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Set mock recent activity
      setRecentActivity([
        {
          id: "a1",
          date: "2023-06-15T14:32:00",
          wasteType: "plastic",
          imageUrl: "https://images.unsplash.com/photo-1591213954196-2d0ccb3f8d4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80",
          points: 10,
        },
        {
          id: "a2",
          date: "2023-06-14T09:45:00",
          wasteType: "paper",
          imageUrl: "https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2676&q=80",
          points: 8,
        },
        {
          id: "a3",
          date: "2023-06-12T16:20:00",
          wasteType: "glass",
          imageUrl: "https://images.unsplash.com/photo-1550411294-56f7d0c7fbe6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
          points: 12,
        },
        {
          id: "a4",
          date: "2023-06-10T11:05:00",
          wasteType: "metal",
          imageUrl: "https://images.unsplash.com/photo-1614951841259-505dad8916da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2670&q=80",
          points: 15,
        },
        {
          id: "a5",
          date: "2023-06-08T14:50:00",
          wasteType: "electronic",
          imageUrl: "https://images.unsplash.com/photo-1586768555975-5dcddace4b02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2672&q=80",
          points: 20,
        },
      ]);
      
      // Set mock badges
      setBadges([
        {
          id: "b1",
          name: "Recycling Novice",
          description: "Classified your first 5 items",
          icon: <Recycle className="h-5 w-5 text-eco-green" />,
          earnedOn: "2023-06-08",
        },
        {
          id: "b2",
          name: "Plastic Master",
          description: "Classified 25 plastic items",
          icon: <BarChart className="h-5 w-5 text-eco-yellow-dark" />,
          earnedOn: "2023-06-12",
        },
        {
          id: "b3",
          name: "Eco Enthusiast",
          description: "Used the app for 7 consecutive days",
          icon: <Leaf className="h-5 w-5 text-eco-green" />,
          earnedOn: "2023-06-14",
        },
        {
          id: "b4",
          name: "Paper Saver",
          description: "Classified 20 paper items",
          icon: <FileText className="h-5 w-5 text-eco-blue" />,
          progress: 60,
        },
        {
          id: "b5",
          name: "Eco Hero",
          description: "Reach 500 total points",
          icon: <Award className="h-5 w-5 text-yellow-500" />,
          progress: 30,
        },
      ]);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center bg-eco-neutral-50 dark:bg-eco-neutral-900">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-eco-green border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-eco-neutral-600 dark:text-eco-neutral-400">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const wasteTypeInfo = {
    plastic: {
      icon: <Recycle className="h-5 w-5" />,
      color: "text-eco-yellow-dark",
      bgColor: "bg-eco-yellow/10",
    },
    paper: {
      icon: <FileText className="h-5 w-5" />,
      color: "text-eco-blue",
      bgColor: "bg-eco-blue/10",
    },
    glass: {
      icon: <Recycle className="h-5 w-5" />,
      color: "text-eco-green",
      bgColor: "bg-eco-green/10",
    },
    metal: {
      icon: <Recycle className="h-5 w-5" />,
      color: "text-eco-red",
      bgColor: "bg-eco-red/10",
    },
    organic: {
      icon: <Leaf className="h-5 w-5" />,
      color: "text-eco-green",
      bgColor: "bg-eco-green/10",
    },
    electronic: {
      icon: <Trash2 className="h-5 w-5" />,
      color: "text-purple-500",
      bgColor: "bg-purple-100 dark:bg-purple-900/20",
    },
  };

  return (
    <div className="min-h-screen pt-16 bg-eco-neutral-50 dark:bg-eco-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src={userData.avatar} 
                    alt={userData.name}
                    className="w-full h-full object-cover" 
                  />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-eco-neutral-900 dark:text-white mb-1">
                    {userData.name}'s Dashboard
                  </h1>
                  <p className="text-eco-neutral-600 dark:text-eco-neutral-400">
                    Track your recycling journey and environmental impact
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate("/")}
                  className="eco-button-outline"
                >
                  <UploadCloud className="h-4 w-4 mr-2" />
                  Upload New Item
                </button>
                <button className="p-2 rounded-full bg-white dark:bg-eco-neutral-800 text-eco-neutral-600 dark:text-eco-neutral-400 hover:text-eco-green border border-eco-neutral-200 dark:border-eco-neutral-700">
                  <Settings className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Dashboard Navigation */}
          <div className="flex overflow-x-auto pb-2 mb-6 scrollbar-none">
            <nav className="flex space-x-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeTab === "overview"
                    ? "bg-eco-green text-white"
                    : "bg-white dark:bg-eco-neutral-800 text-eco-neutral-600 dark:text-eco-neutral-400 hover:bg-eco-neutral-100 dark:hover:bg-eco-neutral-700"
                }`}
              >
                <BarChart3 className="h-4 w-4 inline-block mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("activity")}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeTab === "activity"
                    ? "bg-eco-green text-white"
                    : "bg-white dark:bg-eco-neutral-800 text-eco-neutral-600 dark:text-eco-neutral-400 hover:bg-eco-neutral-100 dark:hover:bg-eco-neutral-700"
                }`}
              >
                <Calendar className="h-4 w-4 inline-block mr-2" />
                Activity History
              </button>
              <button
                onClick={() => setActiveTab("badges")}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeTab === "badges"
                    ? "bg-eco-green text-white"
                    : "bg-white dark:bg-eco-neutral-800 text-eco-neutral-600 dark:text-eco-neutral-400 hover:bg-eco-neutral-100 dark:hover:bg-eco-neutral-700"
                }`}
              >
                <Award className="h-4 w-4 inline-block mr-2" />
                Badges & Achievements
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                  activeTab === "profile"
                    ? "bg-eco-green text-white"
                    : "bg-white dark:bg-eco-neutral-800 text-eco-neutral-600 dark:text-eco-neutral-400 hover:bg-eco-neutral-100 dark:hover:bg-eco-neutral-700"
                }`}
              >
                <User className="h-4 w-4 inline-block mr-2" />
                Profile Settings
              </button>
            </nav>
          </div>

          {/* Dashboard Content */}
          <div className="animate-fade-in">
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats cards */}
                <div className="glass-card rounded-xl overflow-hidden p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-eco-neutral-600 dark:text-eco-neutral-400 text-sm">
                        Total Points
                      </h3>
                      <p className="text-3xl font-bold text-eco-neutral-900 dark:text-white">
                        1,150
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-eco-green/10 flex items-center justify-center">
                      <Award className="h-5 w-5 text-eco-green" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-eco-green text-sm font-medium">
                      <span className="inline-block mr-1">↑</span> 
                      24 points this week
                    </span>
                  </div>
                </div>

                <div className="glass-card rounded-xl overflow-hidden p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-eco-neutral-600 dark:text-eco-neutral-400 text-sm">
                        Items Classified
                      </h3>
                      <p className="text-3xl font-bold text-eco-neutral-900 dark:text-white">
                        113
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-eco-blue/10 flex items-center justify-center">
                      <Recycle className="h-5 w-5 text-eco-blue" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-eco-blue text-sm font-medium">
                      <span className="inline-block mr-1">↑</span> 
                      5 items this week
                    </span>
                  </div>
                </div>

                <div className="glass-card rounded-xl overflow-hidden p-5">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-eco-neutral-600 dark:text-eco-neutral-400 text-sm">
                        Current Rank
                      </h3>
                      <p className="text-3xl font-bold text-eco-neutral-900 dark:text-white">
                        #24
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-eco-yellow/10 flex items-center justify-center">
                      <Trophy className="h-5 w-5 text-eco-yellow-dark" />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-eco-green text-sm font-medium">
                      <span className="inline-block mr-1">↑</span> 
                      Moved up 3 positions
                    </span>
                  </div>
                </div>

                {/* Waste distribution chart */}
                <div className="glass-card rounded-xl overflow-hidden p-5 md:col-span-2 lg:col-span-2">
                  <h3 className="font-semibold text-eco-neutral-900 dark:text-white mb-4">
                    Waste Classification Distribution
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {/* Chart placeholder - in a real app, use Chart.js or other library */}
                    <div className="relative sm:col-span-1">
                      <div className="w-full aspect-square relative">
                        <svg viewBox="0 0 100 100" className="w-full h-full">
                          <circle 
                            cx="50" cy="50" r="40" 
                            fill="transparent" 
                            stroke="#f1f1f1" 
                            strokeWidth="15" 
                          />
                          
                          {/* Calculate and draw pie chart segments */}
                          {(() => {
                            let segments = [];
                            let currentAngle = 0;
                            let total = mockChartData.reduce((sum, item) => sum + item.value, 0);
                            
                            for (let i = 0; i < mockChartData.length; i++) {
                              const item = mockChartData[i];
                              const angle = (item.value / total) * 360;
                              const [startX, startY] = [
                                50 + 40 * Math.cos((currentAngle * Math.PI) / 180),
                                50 + 40 * Math.sin((currentAngle * Math.PI) / 180)
                              ];
                              currentAngle += angle;
                              const [endX, endY] = [
                                50 + 40 * Math.cos((currentAngle * Math.PI) / 180),
                                50 + 40 * Math.sin((currentAngle * Math.PI) / 180)
                              ];
                              
                              const largeArcFlag = angle > 180 ? 1 : 0;
                              
                              segments.push(
                                <path
                                  key={i}
                                  d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                                  fill={item.color}
                                />
                              );
                            }
                            
                            return segments;
                          })()}
                          
                          {/* Center hole */}
                          <circle 
                            cx="50" cy="50" r="25" 
                            fill="white" 
                            className="dark:fill-eco-neutral-800" 
                          />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="sm:col-span-2">
                      <div className="space-y-3">
                        {mockChartData.map((item, index) => (
                          <div key={index} className="flex items-center">
                            <div 
                              className="w-4 h-4 rounded-sm mr-3"
                              style={{ backgroundColor: item.color }}
                            ></div>
                            <div className="flex-grow">
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium text-eco-neutral-800 dark:text-eco-neutral-200">
                                  {item.name}
                                </span>
                                <span className="text-sm text-eco-neutral-600 dark:text-eco-neutral-400">
                                  {item.value}%
                                </span>
                              </div>
                              <div className="w-full h-2 bg-eco-neutral-200 dark:bg-eco-neutral-700 rounded-full">
                                <div 
                                  className="h-full rounded-full" 
                                  style={{ width: `${item.value}%`, backgroundColor: item.color }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent activity */}
                <div className="glass-card rounded-xl overflow-hidden p-5 md:col-span-1">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-eco-neutral-900 dark:text-white">
                      Recent Activity
                    </h3>
                    <button
                      onClick={() => setActiveTab("activity")}
                      className="text-eco-green hover:text-eco-green-dark text-sm font-medium flex items-center"
                    >
                      View All
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentActivity.slice(0, 3).map((activity) => (
                      <div
                        key={activity.id}
                        className="flex items-start"
                      >
                        <div className="w-10 h-10 rounded-md overflow-hidden mr-3">
                          <img 
                            src={activity.imageUrl} 
                            alt={`${activity.wasteType} waste`}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center">
                            <div 
                              className={`p-1 rounded-full ${wasteTypeInfo[activity.wasteType].bgColor} mr-2`}
                            >
                              {wasteTypeInfo[activity.wasteType].icon}
                            </div>
                            <div className="flex-grow">
                              <p className="text-sm font-medium text-eco-neutral-800 dark:text-white">
                                Classified {activity.wasteType} waste
                              </p>
                              <p className="text-xs text-eco-neutral-500 dark:text-eco-neutral-400">
                                {formatDate(activity.date)} • {activity.points} points
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "activity" && (
              <div className="glass-card rounded-xl overflow-hidden p-6">
                <h2 className="text-xl font-semibold text-eco-neutral-900 dark:text-white mb-6">
                  Activity History
                </h2>
                
                {recentActivity.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto text-eco-neutral-400 mb-3" />
                    <p className="text-eco-neutral-600 dark:text-eco-neutral-400">
                      No activity yet. Start by uploading your first waste item!
                    </p>
                    <button
                      onClick={() => navigate("/")}
                      className="eco-button-primary mt-4"
                    >
                      Upload Waste Item
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {recentActivity.map((activity) => (
                      <div
                        key={activity.id}
                        className="flex flex-col sm:flex-row sm:items-center p-4 rounded-xl bg-eco-neutral-50 dark:bg-eco-neutral-800 hover:bg-eco-neutral-100 dark:hover:bg-eco-neutral-700 transition-colors"
                      >
                        <div className="sm:w-24 h-24 rounded-md overflow-hidden mb-4 sm:mb-0 sm:mr-6">
                          <img 
                            src={activity.imageUrl} 
                            alt={`${activity.wasteType} waste`}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                            <div className="flex items-center mb-2 sm:mb-0">
                              <div 
                                className={`p-1.5 rounded-full ${wasteTypeInfo[activity.wasteType].bgColor} mr-3`}
                              >
                                {wasteTypeInfo[activity.wasteType].icon}
                              </div>
                              <h3 className="font-medium text-eco-neutral-900 dark:text-white">
                                {activity.wasteType.charAt(0).toUpperCase() + activity.wasteType.slice(1)} waste classified
                              </h3>
                            </div>
                            <div className="text-eco-neutral-500 dark:text-eco-neutral-400 text-sm">
                              {formatDate(activity.date)}
                            </div>
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="text-eco-neutral-600 dark:text-eco-neutral-300 text-sm">
                              <Badge 
                                label={`${activity.points} points earned`} 
                                variant="success" 
                                size="sm" 
                              />
                            </div>
                            <div className="mt-2 sm:mt-0">
                              <button
                                onClick={() => {
                                  navigate("/results", {
                                    state: {
                                      imageUrl: activity.imageUrl,
                                      wasteType: activity.wasteType,
                                    },
                                  });
                                }}
                                className="text-eco-green hover:text-eco-green-dark text-sm font-medium"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "badges" && (
              <div className="glass-card rounded-xl overflow-hidden p-6">
                <h2 className="text-xl font-semibold text-eco-neutral-900 dark:text-white mb-6">
                  Badges & Achievements
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Earned badges */}
                  <div className="md:col-span-2 lg:col-span-2">
                    <h3 className="font-medium text-eco-neutral-800 dark:text-eco-neutral-200 mb-4">
                      Earned Badges
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {badges.filter(badge => badge.earnedOn).map((badge) => (
                        <div
                          key={badge.id}
                          className="bg-white dark:bg-eco-neutral-800 border border-eco-neutral-200 dark:border-eco-neutral-700 rounded-xl p-4 flex items-start"
                        >
                          <div className="w-12 h-12 rounded-full bg-eco-neutral-100 dark:bg-eco-neutral-700 flex items-center justify-center mr-4">
                            {badge.icon}
                          </div>
                          <div>
                            <h4 className="font-medium text-eco-neutral-900 dark:text-white mb-1">
                              {badge.name}
                            </h4>
                            <p className="text-eco-neutral-600 dark:text-eco-neutral-400 text-sm mb-2">
                              {badge.description}
                            </p>
                            <div className="text-eco-neutral-500 dark:text-eco-neutral-500 text-xs">
                              Earned on {formatDate(badge.earnedOn!)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Progress badges */}
                  <div className="md:col-span-2 lg:col-span-1">
                    <h3 className="font-medium text-eco-neutral-800 dark:text-eco-neutral-200 mb-4">
                      Progress Towards Badges
                    </h3>
                    
                    <div className="space-y-4">
                      {badges.filter(badge => badge.progress).map((badge) => (
                        <div
                          key={badge.id}
                          className="bg-white dark:bg-eco-neutral-800 border border-eco-neutral-200 dark:border-eco-neutral-700 rounded-xl p-4"
                        >
                          <div className="flex items-center mb-2">
                            <div className="w-8 h-8 rounded-full bg-eco-neutral-100 dark:bg-eco-neutral-700 flex items-center justify-center mr-3">
                              {badge.icon}
                            </div>
                            <h4 className="font-medium text-eco-neutral-900 dark:text-white">
                              {badge.name}
                            </h4>
                          </div>
                          <p className="text-eco-neutral-600 dark:text-eco-neutral-400 text-sm mb-3">
                            {badge.description}
                          </p>
                          <div className="mb-1 flex justify-between items-center">
                            <span className="text-xs font-medium text-eco-neutral-700 dark:text-eco-neutral-300">
                              Progress: {badge.progress}%
                            </span>
                            <span className="text-xs text-eco-neutral-500 dark:text-eco-neutral-500">
                              {badge.progress}/100
                            </span>
                          </div>
                          <div className="w-full h-2 bg-eco-neutral-200 dark:bg-eco-neutral-700 rounded-full">
                            <div 
                              className="h-full bg-eco-green rounded-full" 
                              style={{ width: `${badge.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="glass-card rounded-xl overflow-hidden p-6">
                <h2 className="text-xl font-semibold text-eco-neutral-900 dark:text-white mb-6">
                  Profile Settings
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <div className="flex flex-col items-center">
                      <div className="w-32 h-32 rounded-full overflow-hidden mb-4 relative group">
                        <img 
                          src={userData.avatar} 
                          alt={userData.name}
                          className="w-full h-full object-cover" 
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="text-white text-sm">
                            Change
                          </button>
                        </div>
                      </div>
                      <h3 className="font-medium text-eco-neutral-900 dark:text-white text-lg mb-1">
                        {userData.name}
                      </h3>
                      <p className="text-eco-neutral-600 dark:text-eco-neutral-400 text-sm mb-4">
                        {userData.email}
                      </p>
                      <p className="text-eco-neutral-500 dark:text-eco-neutral-500 text-xs">
                        Joined {formatDate('2023-05-15')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <form className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-eco-neutral-700 dark:text-eco-neutral-300 mb-1">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            defaultValue={userData.name}
                            className="w-full px-4 py-2 bg-white dark:bg-eco-neutral-700 border border-eco-neutral-300 dark:border-eco-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-eco-neutral-700 dark:text-eco-neutral-300 mb-1">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            defaultValue={userData.email}
                            className="w-full px-4 py-2 bg-white dark:bg-eco-neutral-700 border border-eco-neutral-300 dark:border-eco-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="location" className="block text-sm font-medium text-eco-neutral-700 dark:text-eco-neutral-300 mb-1">
                            Location
                          </label>
                          <input
                            type="text"
                            id="location"
                            placeholder="Your city, country"
                            className="w-full px-4 py-2 bg-white dark:bg-eco-neutral-700 border border-eco-neutral-300 dark:border-eco-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                          />
                        </div>
                        
                        <div>
                          <label htmlFor="bio" className="block text-sm font-medium text-eco-neutral-700 dark:text-eco-neutral-300 mb-1">
                            Bio
                          </label>
                          <textarea
                            id="bio"
                            rows={3}
                            placeholder="Tell us about your recycling journey"
                            className="w-full px-4 py-2 bg-white dark:bg-eco-neutral-700 border border-eco-neutral-300 dark:border-eco-neutral-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                          ></textarea>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => toast.success('Profile updated successfully')}
                          className="eco-button-primary"
                        >
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Trophy icon component
const Trophy = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
    <path d="M4 22h16"></path>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
  </svg>
);

export default Dashboard;
