import { useEffect, useState } from "react";
import appwriteService from "../../appwrite/config";
import { Container, PostCard } from "../index";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    appwriteService
      .getPosts()
      .then((res) => {
        if (res) setPosts(res.rows);
      })
      .catch((error) => {
        console.log("Failed to fetch posts", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (!posts.length) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-gray-500 text-lg">No posts found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Container>

        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
          All Posts
        </h1>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.$id} className="h-full">
              <PostCard
                $id={post.$id}
                title={post.title}
                featuredImage={post.featuredImage}
                content={post.content}
              />
            </div>
          ))}
        </div>

      </Container>
    </div>
  );
}
export default AllPosts;
