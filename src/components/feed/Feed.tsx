import { useQuery } from "@tanstack/react-query";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useFirebase } from "@/contexts/FirebaseContext";
import Post from "../post/Post";
import { Skeleton } from "@/components/ui/skeleton";

const Feed = () => {
  const { db } = useFirebase();

  const { data: posts, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const postsRef = collection(db, "posts");
      const q = query(postsRef, orderBy("createdAt", "desc"));
      const snapshot = await getDocs(q);
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-4 p-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-3">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-[300px] w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      {posts?.map((post: any) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

export default Feed;