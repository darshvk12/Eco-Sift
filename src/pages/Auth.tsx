
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  const handleGoogleAuth = () => {
    // In a real app, this would trigger Google OAuth
    toast.loading('Connecting to Google...');
    
    // Simulating authentication process
    setTimeout(() => {
      // Create a mock user in localStorage
      const mockUser = {
        id: 'google-user-123',
        name: 'Google User',
        email: 'user@gmail.com',
        avatar: 'https://ui-avatars.com/api/?name=Google+User&background=4285F4&color=fff',
        provider: 'google',
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success('Successfully signed in with Google');
      navigate('/dashboard');
    }, 2000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password || (!isLogin && !name)) {
      toast.error(isLogin ? 'Please enter email and password' : 'Please fill in all fields');
      return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    // Password validation (at least 6 characters)
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }
    
    toast.loading(isLogin ? 'Signing in...' : 'Creating your account...');
    
    // Simulate authentication process
    setTimeout(() => {
      // Create a mock user in localStorage
      const mockUser = {
        id: 'user-' + Date.now(),
        name: isLogin ? 'Demo User' : name,
        email,
        avatar: `https://ui-avatars.com/api/?name=${isLogin ? 'Demo+User' : name.replace(' ', '+')}&background=34A853&color=fff`,
        provider: 'email',
      };
      
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast.success(isLogin ? 'Successfully signed in' : 'Account created successfully');
      navigate('/dashboard');
    }, 2000);
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-eco-neutral-50 to-white dark:from-eco-neutral-900 dark:to-eco-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-eco-neutral-900 dark:text-white mb-2">
              {isLogin ? 'Welcome Back' : 'Create an Account'}
            </h1>
            <p className="text-eco-neutral-600 dark:text-eco-neutral-400">
              {isLogin 
                ? 'Sign in to your EcoSift account' 
                : 'Join EcoSift and start your recycling journey'}
            </p>
          </div>

          <div className="glass-card rounded-xl overflow-hidden animate-scale-up">
            <div className="p-6 md:p-8">
              {/* Social login */}
              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={handleGoogleAuth}
                  className="w-full flex items-center justify-center gap-3 py-2.5 border border-eco-neutral-300 dark:border-eco-neutral-700 rounded-lg text-eco-neutral-700 dark:text-white bg-white dark:bg-eco-neutral-800 hover:bg-eco-neutral-50 dark:hover:bg-eco-neutral-700 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span className="font-medium">{isLogin ? 'Sign in with Google' : 'Sign up with Google'}</span>
                </button>
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-eco-neutral-300 dark:border-eco-neutral-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-eco-neutral-800 text-eco-neutral-500 dark:text-eco-neutral-400">
                    Or continue with email
                  </span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-1">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-eco-neutral-700 dark:text-eco-neutral-300"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <User className="h-5 w-5 text-eco-neutral-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-white dark:bg-eco-neutral-800 border border-eco-neutral-300 dark:border-eco-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-eco-neutral-700 dark:text-eco-neutral-300"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="h-5 w-5 text-eco-neutral-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white dark:bg-eco-neutral-800 border border-eco-neutral-300 dark:border-eco-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-eco-neutral-700 dark:text-eco-neutral-300"
                    >
                      Password
                    </label>
                    {isLogin && (
                      <a
                        href="#"
                        className="text-sm text-eco-green hover:text-eco-green-dark"
                      >
                        Forgot password?
                      </a>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Lock className="h-5 w-5 text-eco-neutral-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-10 py-2 bg-white dark:bg-eco-neutral-800 border border-eco-neutral-300 dark:border-eco-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-eco-green"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-eco-neutral-400 hover:text-eco-neutral-600 dark:hover:text-eco-neutral-300"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="eco-button-primary w-full flex items-center justify-center"
                >
                  <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-eco-neutral-600 dark:text-eco-neutral-400">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    type="button"
                    onClick={toggleAuthMode}
                    className="ml-1 text-eco-green hover:text-eco-green-dark font-medium"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-sm text-eco-neutral-500 dark:text-eco-neutral-400">
            By signing up, you agree to our{' '}
            <a href="#" className="text-eco-green hover:text-eco-green-dark">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-eco-green hover:text-eco-green-dark">
              Privacy Policy
            </a>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
