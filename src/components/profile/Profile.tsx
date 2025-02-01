import { useFirebase } from "@/contexts/FirebaseContext";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { collection, query, where, getDocs } from "firebase/firestore";

const Profile = () => {
  const { auth, db } = useFirebase();
  const { toast } = useToast();
  const user = auth.currentUser;

  const { data: posts } = useQuery({
    queryKey: ["userPosts", user?.uid],
    queryFn: async () => {
      if (!user?.uid) return [];
      const postsRef = collection(db, "posts");
      const q = query(postsRef, where("authorId", "==", user.uid));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  });

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Success",
        description: "You have been signed out.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-8">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.photoURL || undefined} />
          <AvatarFallback>{user?.displayName?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">{user?.displayName}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-around mb-8 text-center">
        <div>
          <div className="font-bold">{posts?.length || 0}</div>
          <div className="text-gray-600">Posts</div>
        </div>
        <div>
          <div className="font-bold">0</div>
          <div className="text-gray-600">Followers</div>
        </div>
        <div>
          <div className="font-bold">0</div>
          <div className="text-gray-600">Following</div>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1">
        {posts?.map((post: any) => (
          <div key={post.id} className="aspect-square">
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Sign Out Button */}
      <Button
        onClick={handleSignOut}
        variant="destructive"
        className="w-full mt-8"
      >
        Sign Out
      </Button>
    </div>
  );
};

export default Profile;