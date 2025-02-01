import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useFirebase } from "@/contexts/FirebaseContext";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const Explore = () => {
  const { db } = useFirebase();

  const { data: posts } = useQuery({
    queryKey: ["explorePosts"],
    queryFn: async () => {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  });

  return (
    <div className="p-4">
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          placeholder="Search"
          className="pl-10"
        />
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-3 gap-1">
        {posts?.map((post: any) => (
          <div key={post.id} className="aspect-square relative group">
            <img
              src={post.imageUrl}
              alt={post.caption}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center space-x-4 opacity-0 group-hover:opacity-100">
              <div className="text-white flex items-center">
                <span>❤️ {post.likes?.length || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Explore;