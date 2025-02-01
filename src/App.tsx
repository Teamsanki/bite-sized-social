import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SplashScreen from "./components/SplashScreen";
import AuthPage from "./components/auth/AuthPage";
import { FirebaseProvider } from "./contexts/FirebaseContext";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <FirebaseProvider>
        {showSplash ? (
          <SplashScreen onComplete={() => setShowSplash(false)} />
        ) : (
          <AuthPage />
        )}
        <Toaster />
      </FirebaseProvider>
    </QueryClientProvider>
  );
};

export default App;