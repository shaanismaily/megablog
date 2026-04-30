import appwriteService from "../../appwrite/config";
import authSlice from "../../store/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Input, Button, RTE } from "../index";
import { useForm } from "react-hook-form";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const { register, handleSubmit, watch, control, setValue, getValues } =
    useForm({
      title: post?.title || "",
      slug: post?.slug || "",
      content: post?.content || "",
      status: post?.status || "active",
      featuredImage: post?.featuredImage || undefined,
    });

  const submit = async (data) => {
    try {
      if (!userData) {
        console.log("User not logged in");
        return;
        if (post) {
          const file = data.image[0]
            ? await appwriteService.uploadFile(data.image[0])
            : null;

          if (file && post?.featuredImage) {
            await appwriteService.deleteFile(post.featuredImage);
          }

          const dbPost = await appwriteService.updatePost(post.$id, {
            ...data,
            featuredImage: file ? file.$id : undefined,
          });
          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        } else {
          const file = await appwriteService.uploadFile(data.image[0]);

          const dbPost = await appwriteService.createPost({
            ...data,
            featuredImage: file.$id,
            userId: userData.$id,
          });

          if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
          }
        }
      }
    } catch (error) {
        console.log("SUBMIT POST ERROR", error)
    }
  };
}

export default PostForm;
