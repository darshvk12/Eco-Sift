
import { useState, useEffect } from 'react';
import { Trophy, ArrowUp, ArrowDown, User, Award, Filter, Search, ChevronDown, Upload } from 'lucide-react';
import Badge from '@/components/common/Badge';

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'points',
    direction: 'desc'
  });

  useEffect(() => {
    // Simulate API call to get leaderboard data
    const fetchLeaderboardData = async () => {
      setLoading(true);
      
      // Simulated data - in a real app, this would be fetched from an API
      const mockData = [
        {
          id: 1,
          name: 'Alex Johnson',
          username: 'ecohero',
          avatar: 'https://i.pravatar.cc/150?img=1',
          points: 1250,
          wasteItems: 78,
          rank: 1,
          badges: ['Eco Hero', 'Recycling Champion'],
          lastWeekRank: 2,
          wasteTypes: {
            plastic: 32,
            paper: 23,
            glass: 12,
            organic: 8,
            metal: 3
          }
        },
        // More users would go here
      ];
      
      // Simulate API delay
      setTimeout(() => {
        setUsers(mockData);
        setLoading(false);
      }, 1000);
    };
    
    fetchLeaderboardData();
  }, []);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Get sorted and filtered users
  const getSortedAndFilteredUsers = () => {
    let filteredUsers = [...users];
    
    // Apply search filter
    if (searchQuery) {
      filteredUsers = filteredUsers.filter(user => 
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply category filter
    if (filter !== 'all') {
      // In a real app, you'd filter based on categories
    }
    
    // Apply sorting
    filteredUsers.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    return filteredUsers;
  };

  // Get sorted and filtered users
  const sortedAndFilteredUsers = getSortedAndFilteredUsers();

  return (
    <div className="pt-16 min-h-screen bg-eco-neutral-50 dark:bg-eco-neutral-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-eco-neutral-800 dark:text-white mb-2">
            <Trophy className="inline-block mr-2 text-eco-yellow h-8 w-8" />
            EcoSift Leaderboard
          </h1>
          <p className="text-eco-neutral-600 dark:text-eco-neutral-400 max-w-2xl mx-auto">
            See how you rank against other eco-heroes in our community. Earn points by classifying and recycling waste items!
          </p>
        </div>
        
        {/* Filters and search */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center">
            <div className="relative">
              <button
                className="eco-button-outline flex items-center"
                onClick={() => {/* Toggle filter dropdown */}}
              >
                <Filter className="h-4 w-4 mr-2" />
                Filter
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              {/* Filter dropdown would go here */}
            </div>
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-eco-neutral-400" />
            </div>
            <input
              type="text"
              className="pl-10 w-full rounded-md border border-eco-neutral-300 bg-white dark:bg-eco-neutral-800 dark:border-eco-neutral-700 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-eco-green"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Leaderboard table */}
        <div className="bg-white dark:bg-eco-neutral-800 shadow-md rounded-lg overflow-hidden border border-eco-neutral-200 dark:border-eco-neutral-700">
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-green"></div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-eco-neutral-200 dark:divide-eco-neutral-700">
                <thead className="bg-eco-neutral-50 dark:bg-eco-neutral-900">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-eco-neutral-500 uppercase tracking-wider">
                      Rank
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-eco-neutral-500 uppercase tracking-wider">
                      User
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-eco-neutral-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('points')}
                    >
                      Points
                      {sortConfig.key === 'points' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'asc' ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />}
                        </span>
                      )}
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium text-eco-neutral-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort('wasteItems')}
                    >
                      Items
                      {sortConfig.key === 'wasteItems' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'asc' ? <ArrowUp className="inline h-3 w-3" /> : <ArrowDown className="inline h-3 w-3" />}
                        </span>
                      )}
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-eco-neutral-500 uppercase tracking-wider">
                      Badges
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-eco-neutral-800 divide-y divide-eco-neutral-200 dark:divide-eco-neutral-700">
                  {sortedAndFilteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-eco-neutral-50 dark:hover:bg-eco-neutral-700 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            user.rank === 1 ? 'bg-eco-yellow/10 text-eco-yellow-dark' : 
                            user.rank === 2 ? 'bg-eco-neutral-300/20 text-eco-neutral-600' : 
                            user.rank === 3 ? 'bg-eco-yellow-dark/10 text-eco-yellow-dark' : 
                            'bg-eco-neutral-100 text-eco-neutral-600 dark:bg-eco-neutral-700 dark:text-eco-neutral-400'
                          }`}>
                            {user.rank}
                          </div>
                          <div className="ml-2">
                            {user.lastWeekRank > user.rank ? (
                              <ArrowUp className="h-4 w-4 text-eco-green" />
                            ) : user.lastWeekRank < user.rank ? (
                              <ArrowDown className="h-4 w-4 text-eco-red" />
                            ) : (
                              <div className="h-4 w-4"></div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            {user.avatar ? (
                              <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt="" />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-eco-neutral-200 dark:bg-eco-neutral-700 flex items-center justify-center">
                                <User className="h-6 w-6 text-eco-neutral-500 dark:text-eco-neutral-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-eco-neutral-900 dark:text-white">
                              {user.name}
                            </div>
                            <div className="text-sm text-eco-neutral-500 dark:text-eco-neutral-400">
                              @{user.username}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-eco-neutral-900 dark:text-white">
                          {user.points.toLocaleString()}
                        </div>
                        <div className="w-full bg-eco-neutral-200 dark:bg-eco-neutral-700 rounded-full h-1.5 mt-1">
                          <div 
                            className="bg-eco-green h-1.5 rounded-full" 
                            style={{ width: `${Math.min(100, (user.points / 1500) * 100)}%` }}
                          ></div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-eco-neutral-900 dark:text-white">
                        {user.wasteItems}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-eco-neutral-500">
                        <div className="flex flex-wrap gap-1">
                          {user.badges.map((badge, index) => (
                            <Badge 
                              key={index}
                              label={badge}
                              variant={index % 2 === 0 ? "success" : "info"}
                              size="sm"
                              icon={<Award className="h-3 w-3" />}
                            />
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
