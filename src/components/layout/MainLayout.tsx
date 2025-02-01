import { useState } from "react";
import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import Feed from "../feed/Feed";
import CreatePost from "../post/CreatePost";
import Profile from "../profile/Profile";
import Explore from "../explore/Explore";
import Notifications from "../notifications/Notifications";

const MainLayout = () => {
  const [currentTab, setCurrentTab] = useState("home");

  const renderContent = () => {
    switch (currentTab) {
      case "home":
        return <Feed />;
      case "search":
        return <Explore />;
      case "create":
        return <CreatePost />;
      case "notifications":
        return <Notifications />;
      case "profile":
        return <Profile />;
      default:
        return <Feed />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto pb-16">
        {renderContent()}
      </div>
      
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex justify-between py-3">
            <button
              onClick={() => setCurrentTab("home")}
              className={`p-2 ${currentTab === "home" ? "text-primary" : "text-gray-500"}`}
            >
              <Home />
            </button>
            <button
              onClick={() => setCurrentTab("search")}
              className={`p-2 ${currentTab === "search" ? "text-primary" : "text-gray-500"}`}
            >
              <Search />
            </button>
            <button
              onClick={() => setCurrentTab("create")}
              className={`p-2 ${currentTab === "create" ? "text-primary" : "text-gray-500"}`}
            >
              <PlusSquare />
            </button>
            <button
              onClick={() => setCurrentTab("notifications")}
              className={`p-2 ${currentTab === "notifications" ? "text-primary" : "text-gray-500"}`}
            >
              <Heart />
            </button>
            <button
              onClick={() => setCurrentTab("profile")}
              className={`p-2 ${currentTab === "profile" ? "text-primary" : "text-gray-500"}`}
            >
              <User />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default MainLayout;