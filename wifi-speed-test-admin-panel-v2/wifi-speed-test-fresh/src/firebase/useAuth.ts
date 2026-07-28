import { useState, useCallback } from 'react';

// Demo user interface (matches Firebase User)
interface DemoUser {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

interface AuthState {
  user: DemoUser | null;
  loading: boolean;
  error: string | null;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('speedtest-user');
    if (savedUser) {
      console.log('✅ User already logged in:', JSON.parse(savedUser));
      return {
        user: JSON.parse(savedUser),
        loading: false,
        error: null,
      };
    }
    return {
      user: null,
      loading: false,
      error: null,
    };
  });

  // Sign in with Google (DEMO MODE - No Firebase required)
  const signInWithGoogle = useCallback(async () => {
    try {
      console.log('🔄 Starting sign-in...');
      setState(s => ({ ...s, loading: true, error: null }));
      
      // Simulate Google Sign-In delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create demo user with random name for variety
      const names = ['Demo User', 'Speed Tester', 'Network Pro', 'Bandwidth King'];
      const randomName = names[Math.floor(Math.random() * names.length)];
      
      const demoUser: DemoUser = {
        uid: 'demo-user-' + Date.now(),
        email: 'user@gmail.com',
        displayName: randomName,
        photoURL: `https://ui-avatars.com/api/?name=${encodeURIComponent(randomName)}&background=00d4ff&color=0a0e1a&size=128`,
      };
      
      // Save to localStorage
      localStorage.setItem('speedtest-user', JSON.stringify(demoUser));
      
      setState({
        user: demoUser,
        loading: false,
        error: null,
      });
      
      console.log('✅ Sign-In Successful!', demoUser);
      console.log('💾 Saved to localStorage');
    } catch (error: any) {
      console.error('❌ Sign-In Error:', error);
      setState(s => ({
        ...s,
        loading: false,
        error: error.message || 'Failed to sign in',
      }));
    }
  }, []);

  // Sign out
  const logout = useCallback(async () => {
    try {
      console.log('🔄 Signing out...');
      setState(s => ({ ...s, loading: true, error: null }));
      
      // Remove from localStorage
      localStorage.removeItem('speedtest-user');
      
      setState({
        user: null,
        loading: false,
        error: null,
      });
      
      console.log('✅ Signed out successfully');
    } catch (error: any) {
      console.error('❌ Sign Out Error:', error);
      setState(s => ({
        ...s,
        loading: false,
        error: error.message || 'Failed to sign out',
      }));
    }
  }, []);

  return {
    user: state.user,
    loading: state.loading,
    error: state.error,
    signInWithGoogle,
    logout,
    isAuthenticated: !!state.user,
  };
}
