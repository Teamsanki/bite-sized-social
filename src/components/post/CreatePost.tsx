import { useState } from "react";
import { useFirebase } from "@/contexts/FirebaseContext";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Image } from "lucide-react";

const CreatePost = () => {
  const [image, setImage] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { auth, db, storage } = useFirebase();
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !auth.currentUser) return;

    setIsLoading(true);
    try {
      // Upload image
      const imageRef = ref(storage, `posts/${Date.now()}_${image.name}`);
      const uploadResult = await uploadBytes(imageRef, image);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      // Create post
      await addDoc(collection(db, "posts"), {
        imageUrl,
        caption,
        authorId: auth.currentUser.uid,
        authorName: auth.currentUser.displayName,
        authorAvatar: auth.currentUser.photoURL,
        likes: [],
        createdAt: new Date().toISOString(),
      });

      toast({
        title: "Success!",
        description: "Your post has been created.",
      });

      // Reset form
      setImage(null);
      setCaption("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            id="image-input"
          />
          <label
            htmlFor="image-input"
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            {image ? (
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="max-h-80 object-contain"
              />
            ) : (
              <div className="text-center">
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2">Click to upload an image</p>
              </div>
            )}
          </label>
        </div>

        <Textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="min-h-[100px]"
        />

        <Button
          type="submit"
          className="w-full"
          disabled={!image || isLoading}
        >
          {isLoading ? "Creating post..." : "Share Post"}
        </Button>
      </form>
    </div>
  );
};

export default CreatePost;