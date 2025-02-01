import { useState } from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useFirebase } from "@/contexts/FirebaseContext";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostProps {
  post: {
    id: string;
    imageUrl: string;
    caption: string;
    likes: string[];
    authorId: string;
    authorName: string;
    authorAvatar?: string;
  };
}

const Post = ({ post }: PostProps) => {
  const { auth, db } = useFirebase();
  const [isLiked, setIsLiked] = useState(post.likes?.includes(auth.currentUser?.uid || ""));

  const handleLike = async () => {
    if (!auth.currentUser) return;

    const postRef = doc(db, "posts", post.id);
    const userId = auth.currentUser.uid;

    try {
      await updateDoc(postRef, {
        likes: isLiked ? arrayRemove(userId) : arrayUnion(userId)
      });
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error updating like:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Post Header */}
      <div className="flex items-center p-4">
        <Avatar className="h-8 w-8">
          <AvatarImage src={post.authorAvatar} />
          <AvatarFallback>{post.authorName[0]}</AvatarFallback>
        </Avatar>
        <span className="ml-2 font-medium">{post.authorName}</span>
      </div>

      {/* Post Image */}
      <div className="relative aspect-square">
        <img
          src={post.imageUrl}
          alt={post.caption}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Actions */}
      <div className="p-4">
        <div className="flex space-x-4">
          <button
            onClick={handleLike}
            className={`${isLiked ? "text-red-500" : "text-gray-500"}`}
          >
            <Heart className={`h-6 w-6 ${isLiked ? "fill-current" : ""}`} />
          </button>
          <button className="text-gray-500">
            <MessageCircle className="h-6 w-6" />
          </button>
          <button className="text-gray-500">
            <Share2 className="h-6 w-6" />
          </button>
        </div>

        {/* Likes Count */}
        <p className="mt-2 font-medium">
          {post.likes?.length || 0} likes
        </p>

        {/* Caption */}
        <p className="mt-1">
          <span className="font-medium mr-2">{post.authorName}</span>
          {post.caption}
        </p>
      </div>
    </div>
  );
};

export default Post;