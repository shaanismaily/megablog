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
        res && setPosts(res.rows);
      })
      .catch((error) => {
        console.log("Failed to fetch posts", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <Container>
      {posts.map((post) => {
        <div key={post.$id}>
          <PostCard
            $id={post.$id}
            title={post.title}
            featuredImage={post.featuredImage}
            content={post.content}
          />
        </div>;
      })}
    </Container>
  );
}
export default AllPosts;
