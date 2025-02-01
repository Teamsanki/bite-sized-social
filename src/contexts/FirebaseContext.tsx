import { createContext, useContext, ReactNode } from 'react';
import { auth, db, storage } from '@/lib/firebase';

interface FirebaseContextType {
  auth: typeof auth;
  db: typeof db;
  storage: typeof storage;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export const FirebaseProvider = ({ children }: { children: ReactNode }) => {
  return (
    <FirebaseContext.Provider value={{ auth, db, storage }}>
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};