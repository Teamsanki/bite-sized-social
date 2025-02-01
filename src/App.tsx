import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SplashScreen from "./components/SplashScreen";
import AuthPage from "./components/auth/AuthPage";
import MainLayout from "./components/layout/MainLayout";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import { useFirebase } from "./contexts/FirebaseContext";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

const queryClient = new QueryClient();

const AppContent = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<any>(null);
  const { auth } = useFirebase();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
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