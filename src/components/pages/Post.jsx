import { useEffect } from "react";
import appwriteService from "../../appwrite/config";
import {useSelector} from "react-redux";
import authSlice from "../../store/authSlice"
import {useNavigate, useParams} from "react-router-dom"
import { useState } from "react";
import { Container, Button } from "../index"
import { Link } from "react-router-dom";
import parse from "html-react-parser"

function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    try {
      const status = await appwriteService.deletePost(post.$id);

      if (status) {
        if (post.featuredImage) {
          try {
            await appwriteService.deleteFile(post.featuredImage);
          } catch (fileError) {
            console.error("File delete failed:", fileError);
          }
        }
        navigate("/");
      }
    } catch (error) {
      console.error("Post delete failed", error);
    }
  };

  return post ? (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Container>
        <div className="relative w-full max-w-4xl mx-auto mb-6 rounded-2xl overflow-hidden shadow-md border bg-white">
          <img
            src={appwriteService.getFileView(post.featuredImage).toString()}
            alt={post.title}
            className="w-full h-55 sm:h-75 md:h-100 object-cover"
          />

          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <Button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-sm">
                  Edit
                </Button>
              </Link>
              <Button
                onClick={deletePost}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm"
              >
                Delete
              </Button>
            </div>
          )}
        </div>

        <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-sm border">
     
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 leading-tight mb-4">
            {post.title}
          </h1>

          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-gray-700">
            {parse(post.content)}
          </div>
        </div>
      </Container>
    </div>
  ) : null;
}
export default Post;