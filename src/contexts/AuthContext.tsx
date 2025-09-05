import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, googleProvider, db } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  uid: string;
  email: string;
  displayName: string;
  role: 'admin' | 'user';
  isActive: boolean;
}

interface AuthContextType {
  currentUser: User | null;
  userData: UserData | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Check if user exists in Firestore users collection
  const checkUserExists = async (user: User): Promise<UserData | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        if (data.isActive) {
          return {
            uid: user.uid,
            email: user.email!,
            displayName: data.displayName || user.displayName || '',
            role: data.role || 'user',
            isActive: data.isActive
          };
        } else {
          throw new Error('Account is deactivated. Please contact administrator.');
        }
      } else {
        throw new Error('User not authorized. Please contact administrator.');
      }
    } catch (error) {
      console.error('Error checking user:', error);
      throw error;
    }
  };

  // Email and password login
  const login = async (email: string, password: string) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const userData = await checkUserExists(result.user);
      setUserData(userData);
      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Google login
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const userData = await checkUserExists(result.user);
      setUserData(userData);
      toast({
        title: "Welcome!",
        description: "You have successfully logged in with Google.",
      });
    } catch (error: any) {
      console.error('Google login error:', error);
      toast({
        title: "Login Failed",
        description: error.message || "Google login failed.",
        variant: "destructive",
      });
      throw error;
    }
  };

  // Logout
  const logout = async () => {
    try {
      await signOut(auth);
      setUserData(null);
      toast({
        title: "Goodbye!",
        description: "You have been logged out successfully.",
      });
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: "Logout Failed",
        description: error.message || "Failed to logout.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userData = await checkUserExists(user);
          setUserData(userData);
        } catch (error) {
          console.error('Auth state change error:', error);
          setUserData(null);
          await signOut(auth);
        }
      } else {
        setUserData(null);
      }
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    userData,
    login,
    loginWithGoogle,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}