import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SplashScreen from "./components/SplashScreen";
import AuthPage from "./components/auth/AuthPage";
import MainLayout from "./components/layout/MainLayout";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import { useFirebase } from "./contexts/FirebaseContext";
import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const { auth } = useFirebase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Only store necessary user data
      if (currentUser) {
        const serializedUser = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL,
        };
        setUser(serializedUser as User);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return user ? <MainLayout /> : <AuthPage />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseProvider>
        <AppContent />
        <Toaster />
      </FirebaseProvider>
    </QueryClientProvider>
  );
};

export default App;