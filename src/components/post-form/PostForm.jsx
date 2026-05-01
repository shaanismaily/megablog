import appwriteService from "../../appwrite/config";
import authSlice from "../../store/authSlice";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Input, Button, RTE, Select } from "../index";
import { useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";

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

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\s\d]+/g, "-")
        .replace(/\s/g, "-");
    }
    return "";
  }, [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {shouldValidate: true})
      }

      return () => subscription.unsubscribe()
    })
  }, [watch, setValue, slugTransform])

  return (
      <form onSubmit={handleSubmit(submit)}>
        <div className="w-2/3 px-2">
          <Input 
          label="Title: "
          className="mb-4"
          {...register("title", {
            required: true
          })}
          />
          <Input 
          label="Slug: "
          {...register("slug"), {
            required: true
          }}
          onInput = {(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {shouldValidate: true})
          }}
          />
          <RTE 
          label="Content: "
          name="name"
          control={control}
          defaultValue= {getValues("content")}
          />
        </div>

        <div className="w-1/3 px-2">
          <Input 
            label="Featured Image :"
            type="file"
            className="mb-4"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post })}
          />
          <Select 
            label="Status"
            options={["active", "inactive"]}
            className="mb-4"
            {...register("status", {
              required: true
            })}
          />
          {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}

        <Button 
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-[70%]"
          children={post ? "Update" : "Submit"}
        />
        </div>
      </form>
  )
}

export default PostForm;
