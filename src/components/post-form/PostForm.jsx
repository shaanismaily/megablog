import appwriteService from "../../appwrite/config";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button, RTE, Select } from "../index";
import { set, useForm } from "react-hook-form";
import { useCallback, useEffect } from "react";

function PostForm({ post }) {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    getValues,
    reset
  } = useForm({
    defaultValues: {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    },
  });

  const submit = async (data) => {
    if (!userData) {
      navigate("/login");
      return;
    }
    try {
      if (post) {
        // UPDATE FLOW
        const file = data.image?.[0]
          ? await appwriteService.uploadFile(data.image[0])
          : null;

        if (file && post.featuredImage) {
          await appwriteService.deleteFile(post.featuredImage);
        }
        const {image, ...rest} = data;

        const dbPost = await appwriteService.updatePost(post.$id, {
          ...rest,
          featuredImage: file ? file.$id : post.featuredImage,
        });

        if (dbPost) {
          navigate(`/post/${dbPost.$id}`);
        }
      } else {
        // CREATE FLOW

        if (!data.image?.[0]) {
          alert("Featured image is required");
          return;
        }

        const file = await appwriteService.uploadFile(data.image[0]);

        if (file) {
          const {image, ...rest} = data;
          const dbPost = await appwriteService.createPost({
            ...rest,
            featuredImage: file.$id,
            userId: userData.$id,
          });

          if (dbPost) navigate(`/post/${dbPost.$id}`);
        }

      }
    } catch (error) {
      console.log("POST SUBMIT ERROR:", error);
    }
  };

  const slugTransform = useCallback((value) => {
    if (typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^\w\s]/g, "")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    if (post) return;

    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, setValue, slugTransform]);

  useEffect(() => {
  if (post) {
    reset({
      title: post.title,
      slug: post.$id,
      content: post.content,
      status: post.status || "active",
    });
  }
}, [post, reset]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      
      {/* LEFT SIDE */}
      <div className="w-2/3 px-2">
        <Input
          label="Title:"
          className="mb-4"
          {...register("title", { required: true })}
        />

        <Input
          label="Slug:"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
          disabled={!!post}
        />

        <RTE
          label="Content:"
          name="content"
          control={control}
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image:"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />

        {post && post.featuredImage && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          label="Status"
          options={["active", "inactive"]}
          className="mb-4"
          {...register("status", { required: true })}
        />


        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-[70%]"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}
export default PostForm;