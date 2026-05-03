import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function PostCard({ $id, title, content, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl p-4 shadow hover:shadow-md transition">
        <div className="w-full mb-4">
          <img
            src={
              featuredImage
                ? appwriteService.getFileView(featuredImage)
                : "/placeholder.png"
            }
            alt={title}
            className="rounded-xl w-full h-48 object-cover"
          />
        </div>

        <h2 className="text-lg font-semibold text-gray-800 mb-2">{title}</h2>

        <p className="text-sm text-gray-600 line-clamp-2">
          {content ? content.replace(/<[^>]+>/g, "").slice(0, 100) + "..." : ""}
        </p>
      </div>
    </Link>
  );
}
export default PostCard;
