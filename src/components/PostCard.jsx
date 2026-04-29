import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, content, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-gray-100 rounded-xl p-4">
        <div className="w-full justify-center mb-4">
          <img
            src={
              featuredImage
                ? appwriteService.getFileView(featuredImage).toString()
                : "/placeholder.png"
            }
            alt={title}
            className="rounded-xl"
          />
        </div>
      </div>
      <h2>{title}</h2>
      <p>{content}</p>
    </Link>
  );
}
export default PostCard;
